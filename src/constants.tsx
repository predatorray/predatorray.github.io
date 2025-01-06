import {Link} from "@mui/material";

export const Education = [
  {
    institution: 'Southeast University',
    location: 'Nanjing, China',
    from: '2010',
    to: '2014',
    degree: 'Bachelor of Software Engineering',
  }
];

export const Experience = [
  {
    company: 'Amazon',
    location: 'Vancouver, BC, Canada',
    type: 'Full-time',
    tenure: '2 yrs',
    skills: [
      'Java',
      'Typescript',
      'React',
      'AWS',
      'Amazon Redshift',
      'Amazon OpenSearch',
    ],
    description: [
    ],
    positions: [
      {
        name: 'Software Development Engineer II',
        from: 'Aug 2022',
        to: 'Present',
      },
    ]
  },
  {
    company: 'eBay',
    location: 'Shanghai, China',
    type: 'Full-time',
    tenure: '3 yrs and 3 mos',
    skills: [
      'Java',
      'Kubernetes',
      'Prometheus',
      'Apache Kafka',
      'Apache Flink',
    ],
    description: [
      'Maintained and developed a streaming data platform that serves Kafka & Flink',
      'Drove the efficiency of on-call support',
      'Owned the Monitoring & Alerting system of the streaming data platform',
    ],
    positions: [
      {
        name: 'Member of Technical Staff 1, Software Engineer',
        from: 'Feb 2021',
        to: 'Jul 2022',
      },
      {
        name: 'Software Engineer 3',
        from: 'May 2019',
        to: 'Feb 2021'
      },
    ]
  },
  {
    company: 'Baidu',
    location: 'Shanghai, China',
    type: 'Full-time',
    tenure: '6 yrs',
    skills: [
      'Java',
      'Docker',
      'ElasticSearch',
      'Apache Kafka',
      'Apache Hadoop',
      'Apache Hive',
    ],
    description: [
      'Led the containerization refactoring of a large multi-module legacy system',
      'Responsible for designing and implementing major parts of a log collecting, tracing and analyzing system',
      'Assisted the development of Baidu Mall, and responsible for the infrastructure components to improve the efficiency of the development',
      'Played a major role in developing a data warehousing system for online advertising',
    ],
    positions: [
      {
        name: 'Senior Software Engineer T5',
        from: 'Mar 2017',
        to: 'May 2019'
      },
      {
        name: 'Senior Software Engineer T4',
        from: 'Mar 2015',
        to: 'Mar 2017'
      },
      {
        name: 'Software Engineer T3',
        from: 'Jul 2014',
        to: 'Mar 2015'
      },
    ]
  },
  {
    company: 'Baidu',
    location: 'Shanghai, China',
    type: 'Intern',
    tenure: '1 yr',
    skills: [
      'Java',
      'APNs',
    ],
    positions: [
      {
        name: 'Software Engineer Intern',
        from: 'June 2013',
        to: 'Jul 2014',
      },
    ],
    description: [
      'Developed a Customer Relationship Management system for managing Baidu Ads customers',
      'Implemented an APNs (Apple Push Notification Service) Java client library to push notifications to sales',
    ],
  }
];

export const Projects = [
  {
    name: 'krew-index-tracker',
    type: 'Author',
    when: 'Jan 2025',
    href: 'https://github.com/predatorray/krew-index-tracker',
    skills: [
      'GitHub Actions',
      'Typescript',
      'React',
      'MUI',
    ],
    description: <>a tool that monitors and tracks the download statistics of Krew plugins.</>,
  },
  {
    name: 'mental-texas-holdem',
    type: 'Author',
    when: 'May 2024',
    href: 'https://github.com/predatorray/mental-texas-holdem',
    skills: [
      'Typescript',
      'React',
      'Cryptography',
      'RSA',
      'WebRTC',
      'Playwright',
    ],
    description: <>a mental poker implementation of Texas Hold'em</>,
  },
  {
    name: 'Apache Flink',
    type: 'Contributor',
    when: 'Sep 2022',
    href: null,
    skills: [
      'Apache Flink',
      'Apache Kafka',
      'Java',
    ],
    description: <>
      purposed
      <ul>
        <li>
          a new method in <code>FlinkKafkaProducer</code> to customize Kafka's <code>transactional.id</code> (see: <Link href="https://cwiki.apache.org/confluence/display/FLINK/FLIP-172:+Support+custom+transactional.id+prefix+in+FlinkKafkaProducer" target="_blank" rel="noopener">FLIP-172</Link>)
        </li>
        <li>
          changing log level at runtime (see: <Link href="https://cwiki.apache.org/confluence/display/FLINK/FLIP-210%3A+Change+logging+level+dynamically+at+runtime" target="_blank" rel="noopener">FLIP-210</Link>)
        </li>
      </ul>
      and also did some documentation and translations.
    </>,
  },
  {
    name: 'kubectl-alias',
    type: 'Author',
    when: 'Jul 2022',
    href: 'https://github.com/predatorray/kubectl-alias',
    skills: [
      'Bash',
      'Kubernetes',
    ],
    description: <>the missing alias command for <code>kubectl</code></>,
  },
  {
    name: 'Apache Kafka',
    type: 'Contributor',
    when: 'Feb 2022',
    skills: [
      'Apache Kafka',
      'Java',
    ],
    description: <>bug fix & documentation</>,
  },
  {
    name: 'kubectl-tmux-exec',
    type: 'Author',
    when: 'Mar 2020',
    href: 'https://github.com/predatorray/kubectl-tmux-exec',
    skills: [
      'Bash',
      'Kubernetes',
      'tmux',
    ],
    description: <>
      <p>a kubectl plugin to control multiple pods simultaneously using <code>tmux</code></p>
      <p>6.9K+ downloads, 130+ stars</p>
    </>,
  },
];
