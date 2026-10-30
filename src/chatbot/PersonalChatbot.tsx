import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Box, Button, CircularProgress, Fab, IconButton, Paper, Stack, TextField, Typography} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import {
  answerQuestion, boundedHistory, MAX_QUESTION_LENGTH, Message, ModelAPI, MODEL_OPTIONS,
  readHistory, saveHistory,
} from './model';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home', '/resume': 'Résumé', '/projects': 'Projects', '/gallery': 'Gallery', '/contact': 'Contact',
};

async function isAvailable(api?: ModelAPI): Promise<boolean> {
  if (!window.isSecureContext || !api?.availability || !api?.create) return false;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      api.availability(MODEL_OPTIONS).then(status => status === 'available'),
      new Promise<boolean>(resolve => { timeout = setTimeout(() => resolve(false), 5000); }),
    ]);
  } catch { return false; }
  finally { clearTimeout(timeout); }
}

export default function PersonalChatbot() {
  const location = useLocation();
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<Message[]>(readHistory);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [viewport, setViewport] = useState({height: window.innerHeight, bottom: 0});
  const controller = useRef<AbortController>();
  const failed = useRef(false);
  const mounted = useRef(false);
  const input = useRef<HTMLInputElement>();
  const launcher = useRef<HTMLButtonElement>(null);
  const messages = useRef<HTMLDivElement>(null);
  const api = (window as Window & {LanguageModel?: ModelAPI}).LanguageModel;
  const pageTitle = PAGE_TITLES[location.pathname] || 'Website';

  useEffect(() => {
    mounted.current = true;
    let active = true;
    const check = async () => {
      const ready = await isAvailable(api);
      if (active && !failed.current) {
        setAvailable(ready);
        if (!ready) {
          controller.current?.abort();
          setOpen(false);
        }
      }
    };
    const onVisible = () => { if (document.visibilityState === 'visible') void check(); };
    void check();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      active = false;
      mounted.current = false;
      controller.current?.abort();
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [api]);

  useEffect(() => { saveHistory(history); }, [history]);
  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  useEffect(() => {
    if (messages.current) messages.current.scrollTop = messages.current.scrollHeight;
  }, [history, pending, busy, open]);
  useEffect(() => {
    const update = () => {
      const view = window.visualViewport;
      setViewport({
        height: view?.height ?? window.innerHeight,
        bottom: view ? Math.max(0, window.innerHeight - view.height - view.offsetTop) : 0,
      });
    };
    update();
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  function close() {
    setOpen(false);
    requestAnimationFrame(() => launcher.current?.focus());
  }

  function clear() {
    controller.current?.abort();
    setHistory([]);
    setPending('');
    setNotice('Conversation cleared.');
    input.current?.focus();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const question = draft.trim();
    if (!question || question.length > MAX_QUESTION_LENGTH || busy || controller.current || !api) return;
    const request = new AbortController();
    const page = {
      path: location.pathname, title: pageTitle,
      // The widget sits outside main, so chat text is never included in page context.
      text: document.querySelector('main')?.textContent || '',
    };
    controller.current = request;
    setBusy(true);
    setDraft('');
    setPending(question);
    setNotice('');
    const timeout = setTimeout(() => {
      failed.current = true;
      if (mounted.current) { setAvailable(false); setOpen(false); }
      request.abort();
    }, 60000);
    try {
      if (!await isAvailable(api)) throw new Error('The browser model is unavailable.');
      if (request.signal.aborted) return;
      const answer = await answerQuestion(api, history, page, question, request.signal);
      if (mounted.current && !request.signal.aborted) {
        setHistory(previous => boundedHistory([...previous, {role: 'user', content: question} as Message,
          {role: 'assistant', content: answer} as Message]));
      }
    } catch {
      if (mounted.current && !request.signal.aborted) {
        failed.current = true;
        setAvailable(false);
        setOpen(false);
      }
    } finally {
      clearTimeout(timeout);
      controller.current = undefined;
      if (mounted.current) { setBusy(false); setPending(''); }
    }
  }

  if (!available) return null;
  return (
    <Box sx={{
      position: 'fixed', right: {xs: 12, sm: 24},
      bottom: `calc(max(12px, env(safe-area-inset-bottom)) + ${viewport.bottom}px)`,
      zIndex: theme => theme.zIndex.drawer - 1,
    }}>
      <Fab ref={launcher} variant="extended" aria-label="Chat with Wenhao’s AI"
           aria-expanded={open} aria-controls={open ? 'personal-chat' : undefined}
           onClick={() => setOpen(value => !value)}
           sx={{display: open ? 'none' : 'inline-flex', bgcolor: 'primary.main', color: '#fff',
             textTransform: 'none', '&:hover': {bgcolor: '#333'}}}>
        <ChatBubbleOutlineIcon sx={{mr: 1}} /> Ask Wenhao
      </Fab>
      {open && (
        <Paper id="personal-chat" role="dialog" aria-modal="false" aria-labelledby="personal-chat-title"
               elevation={8} onKeyDown={event => {
                 if (event.key === 'Escape') { event.stopPropagation(); close(); }
               }}
               sx={{width: {xs: 'calc(100vw - 24px)', sm: 380},
                 height: Math.max(0, Math.min(560, viewport.height - 32)),
                 boxSizing: 'border-box',
                 display: 'flex', flexDirection: 'column', borderRadius: 3,
                 border: '1px solid', borderColor: 'divider', overflow: 'hidden'}}>
          <Stack direction="row" alignItems="center" sx={{p: 1.5, borderBottom: '1px solid', borderColor: 'divider'}}>
            <Box sx={{flex: 1, minWidth: 0}}>
              <Typography id="personal-chat-title" fontWeight={700}>Ask Wenhao</Typography>
              <Typography variant="caption" color="text.secondary">AI version · {pageTitle}</Typography>
            </Box>
            <Button size="small" onClick={clear} sx={{textTransform: 'none', minHeight: 44}}>Clear</Button>
            <IconButton aria-label="Close chat" onClick={close} sx={{width: 44, height: 44}}><CloseIcon /></IconButton>
          </Stack>
          <Box ref={messages} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions"
               sx={{flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', p: 2}}>
            <Typography variant="body2" color="text.secondary" sx={{mb: 2, lineHeight: 1.6}}>
              Hi, I’m Wenhao’s AI version. Ask about my work, projects, photography, or this site.
              {' '}Answers run in your browser and may be imperfect.
            </Typography>
            {[...history, ...(pending ? [{role: 'user' as const, content: pending}] : [])].map((message, i) => (
              <Box key={i} sx={{mb: 1.5, ml: message.role === 'user' ? 3 : 0, mr: message.role === 'assistant' ? 3 : 0,
                p: 1.5, borderRadius: 2, bgcolor: message.role === 'user' ? '#121212' : '#f3f4f5',
                color: message.role === 'user' ? '#fff' : 'text.primary'}}>
                <Typography variant="caption" component="p" sx={{fontWeight: 600, mb: 0.5}}>
                  {message.role === 'user' ? 'You' : 'Wenhao · AI'}
                </Typography>
                <Typography variant="body2" sx={{whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', lineHeight: 1.6}}>
                  {message.content}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box role="status" sx={{px: 2}}>
            {busy ? <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={12} color="inherit" />
              <Typography variant="caption">Thinking…</Typography>
            </Stack> : <Typography variant="caption">{notice}</Typography>}
          </Box>
          <Box component="form" onSubmit={submit} sx={{p: 1.5}}>
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <TextField inputRef={input} label="Ask about Wenhao" placeholder="What have you built?"
                         InputLabelProps={{shrink: true}}
                         value={draft} onChange={event => setDraft(event.target.value)}
                         multiline minRows={1} maxRows={3} fullWidth size="small"
                         inputProps={{maxLength: MAX_QUESTION_LENGTH}}
                         sx={{'& textarea': {fontSize: 16}}}
                         onKeyDown={event => {
                           if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                             event.preventDefault();
                             event.currentTarget.closest('form')?.requestSubmit();
                           }
                         }} />
              {busy ? <IconButton aria-label="Stop response" onClick={() => {
                controller.current?.abort(); setNotice('Response stopped.');
              }} sx={{width: 44, height: 44}}><StopIcon /></IconButton> :
                <IconButton type="submit" aria-label="Send message" disabled={!draft.trim()}
                            sx={{width: 44, height: 44}}><SendIcon /></IconButton>}
            </Stack>
            <Typography variant="caption" color="text.secondary" component="p" sx={{mt: 1, lineHeight: 1.4}}>
              History stays in this tab until it closes. Public GitHub lookups use no sign-in.
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
