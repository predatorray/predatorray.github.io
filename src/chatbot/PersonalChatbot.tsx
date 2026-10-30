import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Box, CircularProgress, Fab, IconButton, Paper, Stack, TextField, Tooltip, Typography} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
      <Fab ref={launcher} size="medium" aria-label="Chat with Wenhao’s AI"
           aria-expanded={open} aria-controls={open ? 'personal-chat' : undefined}
           onClick={() => setOpen(value => !value)}
           sx={{display: open ? 'none' : 'inline-flex', bgcolor: 'primary.main', color: '#fff',
             textTransform: 'none', '&:hover': {bgcolor: '#333'}}}>
        <ChatBubbleOutlineIcon />
      </Fab>
      {open && (
        <Paper id="personal-chat" role="dialog" aria-modal="false" aria-labelledby="personal-chat-title"
               elevation={0} onKeyDown={event => {
                 if (event.key === 'Escape') { event.stopPropagation(); close(); }
               }}
               sx={{width: {xs: 'calc(100vw - 24px)', sm: 360},
                 height: Math.max(0, Math.min(480, viewport.height - 32)),
                 boxSizing: 'border-box',
                 display: 'flex', flexDirection: 'column', borderRadius: 3,
                 border: '1px solid', borderColor: 'divider', overflow: 'hidden',
                 boxShadow: '0 8px 40px rgba(0,0,0,0.10)'}}>
          <Stack direction="row" alignItems="center" sx={{pl: 2.5, pr: 1, py: 1}}>
            <Typography id="personal-chat-title" fontWeight={600} sx={{flex: 1}}>Ask Wenhao</Typography>
            <Tooltip title="AI version of Wenhao. Runs in your browser. History stays in this tab; public GitHub lookups need no sign-in."
                     describeChild enterTouchDelay={0}>
              <Typography component="span" tabIndex={0} variant="caption" aria-label="About this AI chat"
                          sx={{color: 'text.secondary', mr: 1, cursor: 'help'}}>AI</Typography>
            </Tooltip>
            <Tooltip title="Clear chat">
              <IconButton aria-label="Clear" onClick={clear} sx={{width: 44, height: 44, color: 'text.secondary'}}>
                <RestartAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton aria-label="Close chat" onClick={close} sx={{width: 44, height: 44, color: 'text.secondary'}}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Box ref={messages} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions"
               sx={{flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', px: 2.5, py: 2}}>
            {!history.length && !pending && (
              <Box sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="body2" color="text.secondary">Ask about my work or this site.</Typography>
              </Box>
            )}
            {[...history, ...(pending ? [{role: 'user' as const, content: pending}] : [])].map((message, i) => (
              <Box key={i} aria-label={message.role === 'user' ? 'You' : 'Wenhao · AI'}
                   sx={{mb: 2.5, ml: message.role === 'user' ? 'auto' : 0,
                     maxWidth: message.role === 'user' ? '85%' : '100%', width: 'fit-content',
                     px: message.role === 'user' ? 1.5 : 0, py: message.role === 'user' ? 1 : 0,
                     borderRadius: 2, bgcolor: message.role === 'user' ? '#f3f4f5' : 'transparent'}}>
                <Typography variant="body2" sx={{whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', lineHeight: 1.7}}>
                  {message.content}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box role="status" sx={{px: 2.5}}>
            {busy ? <CircularProgress size={14} color="inherit" aria-label="Thinking" sx={{mb: 1.5}} /> :
              notice && <Typography variant="caption" color="text.secondary">{notice}</Typography>}
          </Box>
          <Box component="form" onSubmit={submit} sx={{px: 2, py: 1, borderTop: '1px solid', borderColor: 'divider'}}>
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <TextField inputRef={input} placeholder="Ask a question…" variant="standard"
                         InputProps={{disableUnderline: true}}
                         value={draft} onChange={event => setDraft(event.target.value)}
                         multiline minRows={1} maxRows={3} fullWidth size="small"
                         inputProps={{maxLength: MAX_QUESTION_LENGTH, 'aria-label': 'Ask about Wenhao'}}
                         sx={{py: 1, '& textarea': {fontSize: 16}}}
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
          </Box>
        </Paper>
      )}
    </Box>
  );
}
