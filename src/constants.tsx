import {Link} from "@mui/material";

export const Education = [
  {
    institution: 'Southeast University',
    location: 'Nanjing, China',
    from: 'Sep 2010',
    to: 'Jun 2014',
    degree: 'Bachelor of Software Engineering',
  }
];

export const Experience = [
  {
    company: 'Asana',
    location: 'Vancouver, BC, Canada',
    type: 'Full-time',
    skills: [
      'AWS',
      'Databricks',
      'Apache Spark',
    ],
    description: [
      'Data Infrastructure',
      'Logging & Experiments',
    ],
    positions: [
      {
        name: 'Software Engineer',
        from: 'Aug 2026',
        to: 'Present',
      },
    ]
  },
  {
    company: 'Amazon',
    location: 'Vancouver, BC, Canada',
    type: 'Full-time',
    skills: [
      'Java',
      'Typescript',
      'React',
      'AWS',
      'Amazon Redshift',
      'Amazon OpenSearch',
      'Apache Spark',
      'GenAI',
    ],
    description: [
      'Led the design, refactoring, and operational excellence of a large-scale financial auditing platform that detects and prevents vendor-related financial leakages across Amazon’s retail systems.',
      'Migrated the ETL engine from Redshift to Apache Spark, reducing runtime and compute cost while eliminating recurring failures.',
      'Refactored the OpenSearch (ElasticSearch) indexing subsystem for shipment and transaction search, introducing hot–warm–cold tiering and partition-based retention to cut storage costs and improve query performance.',
    ],
    positions: [
      {
        name: 'Software Development Engineer II',
        from: 'Aug 2022',
        to: 'Aug 2026',
      },
    ]
  },
  {
    company: 'eBay',
    location: 'Shanghai, China',
    type: 'Full-time',
    skills: [
      'Java',
      'Kubernetes',
      'Prometheus',
      'Apache Kafka',
      'Apache Flink',
    ],
    description: [
      'Developed and maintained a high-throughput streaming platform powering Apache Kafka and Apache Flink workloads.',
      'Migrated Kafka clusters from virtual machines to Kubernetes, improving scalability and operational consistency.',
      'Delivered internal training on Kafka client internals, educating new and experienced engineers on deep technical concepts.',
      'Designed a cross-data-center failover solution that enabled Flink job continuity in the event of infrastructure outages.',
      'Boosted operational efficiency by building a Bash CLI tool to simplify repetitive support tasks.',
      'Collaborated with the Support-Bot team to implement automated Slack responses for common support issues (e.g., FAQs, RCAs).',
      'Created a custom Slack App to dynamically track and display the current on-call roster for better visibility and coordination.',
      'Architected and deployed a highly available Prometheus cluster using Promxy, ensuring scalable and fault-tolerant monitoring.',
      'Developed auto-remediation workflows triggered by alerts to minimize manual intervention and reduce MTTR.',
      'Maintained full ownership of monitoring, logging, and alerting systems for the streaming platform, ensuring reliability and observability.',
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
    skills: [
      'Java',
      'Docker',
      'ElasticSearch',
      'Apache Kafka',
      'Apache Hadoop',
      'Apache Hive',
    ],
    description: [
      'Led the containerization of a large-scale legacy system, building a Docker-based deployment framework, standardizing secure base images, and orchestrating multi-module subsystems on Baidu App Engine; drove adoption through internal knowledge sharing.',
      'Designed and implemented a high-performance distributed log tracing and analytics platform, inspired by Google Dapper and powered by Elasticsearch and Apache Storm, capable of processing ~2TB/day; also built a custom JavaScript SPA framework for log visualization.',
      'Built core infrastructure components for Baidu Mall, including a shared Redis-based session system and an HTTP resource server backed by object storage, improving development efficiency across distributed subsystems.',
      'Played a major role in development of a data warehousing platform for online advertising, designing ETL pipelines with Hive/Hadoop, creating a LISP-like DSL for HiveSQL, visualizing ETL dependencies, and authoring custom decimal UDFs to extend Hive’s capabilities.',
      'Developed and optimized a core module for a Cloud Drive system, enabling users to upload and manage media assets efficiently. Improved performance via HTTP Cache and Validation enhancements, reducing load times for high-traffic media delivery. Designed and built the first Web UI from scratch, streamlining user interactions and adoption.',
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
      'Contributed to the development of a scalable CRM system, enhancing customer data tracking and improving team workflow efficiency.',
      'Implemented a Java Client of Apple Push Notification Service (APNs) binary protocol from official docs.',
    ],
  }
];

export const Projects = [
  {
    name: 'Rendezvous',
    type: 'Author',
    when: 'May 2026',
    href: 'https://github.com/predatorray/rendezvous',
    skills: [
      'Typescript',
      'React',
      'MUI',
      'WebRTC',
      'PeerJS',
      'P2P',
    ],
    description: <>A serverless, Zoom-like video conferencing web app requiring no accounts or passcodes, built with <b>React</b> and <b>WebRTC</b>. It uses <b>PeerJS</b> for signaling and a host-centric star topology, where the host relays messages and streams to scale efficiently while remaining fully deployable as a static site.</>,
  },
  {
    name: 'dandelion-mesh',
    type: 'Author',
    when: 'Apr 2026',
    href: 'https://github.com/predatorray/dandelion-mesh',
    skills: [
      'Typescript',
      'WebRTC',
      'Raft',
      'Cryptography',
      'P2P',
    ],
    description: <>A fault-tolerant, serverless peer-to-peer mesh network library for browser applications, using <b>WebRTC</b> for transport, <b>Raft</b> consensus for leader election and ordered log replication, and hybrid RSA-OAEP/AES-GCM encryption for private communications.</>,
  },
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
    description: <>The official dashboard and automated pipeline that monitors and tracks plugin usage analytics for <code>kubectl krew</code> for all Krew plugins via <b>GitHub Actions</b> and Release APIs.</>,
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
    description: <>A serverless, peer-to-peer Texas Hold'em game implemented in the browser using <b>WebRTC</b> and the <b>Mental Poker</b> cryptographic protocol to ensure fairness without a trusted third party.</>,
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
      Proposed and implemented:
      <ul>
        <li>
          A new method in <code>FlinkKafkaProducer</code> to customize Kafka's <code>transactional.id</code> (see: <Link href="https://cwiki.apache.org/confluence/display/FLINK/FLIP-172:+Support+custom+transactional.id+prefix+in+FlinkKafkaProducer" target="_blank" rel="noopener">FLIP-172</Link>)
        </li>
        <li>
          Dynamic log level changes at runtime (see: <Link href="https://cwiki.apache.org/confluence/display/FLINK/FLIP-210%3A+Change+logging+level+dynamically+at+runtime" target="_blank" rel="noopener">FLIP-210</Link>)
        </li>
      </ul>
      Also contributed to documentation and Chinese translations.
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
    description: <>A <code>kubectl</code> plugin that adds a native-feeling <code>alias</code> command to manage and use custom aliases within the Kubernetes CLI.</>,
  },
  {
    name: 'Apache Kafka',
    type: 'Contributor',
    when: 'Feb 2022',
    skills: [
      'Apache Kafka',
      'Java',
    ],
    description: <>Contributed bug fixes and improved technical documentation.</>,
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
      <p>A <code>kubectl</code> plugin for executing commands across multiple pods simultaneously using <code>tmux</code>, featuring synchronized input and iTerm2 integration.</p>
    </>,
  },
];

export interface Photo {
  regularSrc: string;
  fullSrc: string;
  description: string;
  link: string;
}

export const Photos: { section: string; photos: Photo[] }[] = [
  {
    section: "Winter in Banff",
    photos: [
      {
        regularSrc: 'https://images.unsplash.com/photo-1671850768178-33b5c0fed4dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8MXx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=80&w=1080',
        fullSrc: 'https://images.unsplash.com/photo-1671850768178-33b5c0fed4dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8MXx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=85',
        description: 'Lake Louise',
        link: 'https://unsplash.com/photos/a-cabin-in-the-middle-of-a-snowy-mountain-range-bH6I5xCUKrw',
      },
      {
        regularSrc: 'https://images.unsplash.com/photo-1597816165828-56c53e9394f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8Mnx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=80&w=1080',
        fullSrc: 'https://images.unsplash.com/photo-1597816165828-56c53e9394f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8Mnx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=85',
        description: 'Moraine Lake',
        link: 'https://unsplash.com/photos/lake-near-snow-covered-mountain-during-daytime-mj64DBw10PE',
      },
      {
        regularSrc: 'https://images.unsplash.com/photo-1671850542704-807a9115af76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8M3x8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=80&w=1080',
        fullSrc: 'https://images.unsplash.com/photo-1671850542704-807a9115af76?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8M3x8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=85',
        description: 'Morant’s Curve',
        link: 'https://unsplash.com/photos/a-train-traveling-through-a-snow-covered-forest-udc3ZpF3zu8',
      },
      {
        regularSrc: 'https://images.unsplash.com/photo-1671850332276-40e3dec384ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8NHx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=80&w=1080',
        fullSrc: 'https://images.unsplash.com/photo-1671850332276-40e3dec384ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8NHx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=85',
        description: 'Two Jake Lake',
        link: 'https://unsplash.com/photos/a-snow-covered-field-with-a-mountain-in-the-background-Wlc5n-Qi7hU',
      },
      {
        regularSrc: 'https://images.unsplash.com/photo-1671851021764-3cad4263e1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8NXx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=80&w=1080',
        fullSrc: 'https://images.unsplash.com/photo-1671851021764-3cad4263e1db?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8NXx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=85',
        description: 'Lake Louise',
        link: 'https://unsplash.com/photos/two-people-standing-in-the-snow-near-mountains-CylqDYfbtjU',
      },
    ],
  },
  {
    section: "Summer in Banff",
    photos: [
      {
        regularSrc: 'https://images.unsplash.com/photo-1723652386871-dc8793a47dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8Nnx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=80&w=1080',
        fullSrc: 'https://images.unsplash.com/photo-1723652386871-dc8793a47dfe?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8Nnx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=85',
        description: 'Moraine Lake',
        link: 'https://unsplash.com/photos/a-lake-surrounded-by-mountains-with-a-pine-tree-in-the-foreground-Y8eTCMULhpI',
      },
      {
        regularSrc: 'https://images.unsplash.com/photo-1723739034843-44cfdd887139?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8N3x8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=80&w=1080',
        fullSrc: 'https://images.unsplash.com/photo-1723739034843-44cfdd887139?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8N3x8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=85',
        description: 'Peyto Lake',
        link: 'https://unsplash.com/photos/a-view-of-a-lake-surrounded-by-mountains-s6UB7Zu6Kt0',
      },
      {
        regularSrc: 'https://images.unsplash.com/photo-1723652707288-54108fa22c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8OHx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=80&w=1080',
        fullSrc: 'https://images.unsplash.com/photo-1723652707288-54108fa22c7b?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxMjA3fDB8MXxhbGx8OHx8fHx8fHx8MTc0MTQwNTIzN3w&ixlib=rb-4.0.3&q=85',
        description: 'Lake Louise',
        link: 'https://unsplash.com/photos/a-body-of-water-surrounded-by-mountains-and-trees-ux0fsMXgoe4',
      },
    ],
  },
];
