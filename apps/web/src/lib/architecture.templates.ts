import type { ArchNode, ArchEdge } from './types';

export interface ArchTemplate {
  id: string;
  name: string;
  category?: string;
  description: string;
  pros: string[];
  cons: string[];
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export const ARCHITECTURE_TEMPLATES: Record<string, ArchTemplate> = {
  "prod_todo": {
    "id": "prod_todo",
    "name": "Task Management App",
    "category": "Productivity",
    "description": "A simple todo list app with real-time sync.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Todo Client",
        "serviceType": "nextjs",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Todo API",
        "serviceType": "fastapi",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "prod_notes": {
    "id": "prod_notes",
    "name": "Note Taking App",
    "category": "Productivity",
    "description": "Markdown-based notes app with vector search.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Notes Client",
        "serviceType": "react",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Notes API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "mongodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "prod_calendar": {
    "id": "prod_calendar",
    "name": "Shared Calendar",
    "category": "Productivity",
    "description": "Team calendar with conflict resolution.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Calendar Client",
        "serviceType": "vue",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Calendar API",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "prod_kanban": {
    "id": "prod_kanban",
    "name": "Kanban Board",
    "category": "Productivity",
    "description": "Agile project management tool.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Kanban Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sqs",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "prod_time": {
    "id": "prod_time",
    "name": "Time Tracker",
    "category": "Productivity",
    "description": "Freelancer time tracking and invoicing.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Time Client",
        "serviceType": "nextjs",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Time API",
        "serviceType": "spring_boot",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "mysql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "edu_lms": {
    "id": "edu_lms",
    "name": "Learning Management System",
    "category": "Education",
    "description": "Course delivery and student tracking.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "kong",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "kafka",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "Course Svc",
        "serviceType": "django",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "Course Svc DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Student Svc",
        "serviceType": "django",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Student Svc DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "svc_2",
        "label": "Progress Svc",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "db_2",
        "label": "Progress Svc DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_2",
        "source": "gw",
        "target": "svc_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_2",
        "source": "svc_2",
        "target": "db_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_2",
        "source": "svc_2",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "edu_quiz": {
    "id": "edu_quiz",
    "name": "Real-time Quiz App",
    "category": "Education",
    "description": "Interactive classroom quizzes like Kahoot.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Quiz Client",
        "serviceType": "react",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Quiz API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "mongodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "edu_flash": {
    "id": "edu_flash",
    "name": "Flashcard App",
    "category": "Education",
    "description": "Spaced repetition flashcard app.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Flashcard Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sns",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "edu_tutor": {
    "id": "edu_tutor",
    "name": "AI Tutor",
    "category": "Education",
    "description": "Personalized AI tutoring chat interface.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Tutor Client",
        "serviceType": "nextjs",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Tutor API",
        "serviceType": "fastapi",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "edu_forum": {
    "id": "edu_forum",
    "name": "Student Forum",
    "category": "Education",
    "description": "Discussion board for university courses.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Forum Client",
        "serviceType": "svelte",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Forum API",
        "serviceType": "ruby",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "biz_crm": {
    "id": "biz_crm",
    "name": "Lightweight CRM",
    "category": "Business",
    "description": "Customer relationship management for small businesses.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "CRM Client",
        "serviceType": "vue",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "CRM API",
        "serviceType": "laravel",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "mysql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "biz_erp": {
    "id": "biz_erp",
    "name": "Micro ERP",
    "category": "Business",
    "description": "Basic enterprise resource planning.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "nginx",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "rabbitmq",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "HR",
        "serviceType": "java",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "HR DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Finance",
        "serviceType": "java",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Finance DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "svc_2",
        "label": "Inventory",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "db_2",
        "label": "Inventory DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_2",
        "source": "gw",
        "target": "svc_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_2",
        "source": "svc_2",
        "target": "db_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_2",
        "source": "svc_2",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "biz_hr": {
    "id": "biz_hr",
    "name": "HR Portal",
    "category": "Business",
    "description": "Employee directory and leave management.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "HR Client",
        "serviceType": "react",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "HR API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "mongodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "biz_analytics": {
    "id": "biz_analytics",
    "name": "Business Dashboard",
    "category": "Business",
    "description": "Internal metrics and KPI dashboard.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Dashboard Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "gcp_functions",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "firestore",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "pubsub",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "gcp_functions",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "biz_inventory": {
    "id": "biz_inventory",
    "name": "Inventory System",
    "category": "Business",
    "description": "Warehouse inventory tracking.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Inventory Client",
        "serviceType": "angular",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Inventory API",
        "serviceType": "spring_boot",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ecom_store": {
    "id": "ecom_store",
    "name": "Boutique Storefront",
    "category": "E-commerce",
    "description": "A headless e-commerce store.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Store Client",
        "serviceType": "nextjs",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Store API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ecom_marketplace": {
    "id": "ecom_marketplace",
    "name": "Multi-vendor Marketplace",
    "category": "E-commerce",
    "description": "Marketplace for independent sellers.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "kong",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "kafka",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "Catalog",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "Catalog DB",
        "serviceType": "mongodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Cart",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Cart DB",
        "serviceType": "mongodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "svc_2",
        "label": "Orders",
        "serviceType": "java",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "db_2",
        "label": "Orders DB",
        "serviceType": "mongodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_2",
        "source": "gw",
        "target": "svc_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_2",
        "source": "svc_2",
        "target": "db_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_2",
        "source": "svc_2",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ecom_subs": {
    "id": "ecom_subs",
    "name": "Subscription Box",
    "category": "E-commerce",
    "description": "Recurring billing and fulfillment.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Billing Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sqs",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ecom_b2b": {
    "id": "ecom_b2b",
    "name": "B2B Wholesale Portal",
    "category": "E-commerce",
    "description": "Bulk ordering with custom pricing.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "B2B Client",
        "serviceType": "vue",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "B2B API",
        "serviceType": "django",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ecom_digital": {
    "id": "ecom_digital",
    "name": "Digital Products Store",
    "category": "E-commerce",
    "description": "Instant delivery of digital assets.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Digital Client",
        "serviceType": "nextjs",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Digital API",
        "serviceType": "fastapi",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "s3",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "mkt_landing": {
    "id": "mkt_landing",
    "name": "High-Convert Landing Page",
    "category": "Marketing",
    "description": "A/B tested landing page with analytics.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Landing Gateway",
        "serviceType": "cloudflare",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "cloudflare_workers",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sns",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "cloudflare_workers",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "mkt_blog": {
    "id": "mkt_blog",
    "name": "Corporate Blog",
    "category": "Marketing",
    "description": "SEO optimized technical blog.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Blog Client",
        "serviceType": "gatsby",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Blog API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "mkt_newsletter": {
    "id": "mkt_newsletter",
    "name": "Newsletter Platform",
    "category": "Marketing",
    "description": "Email campaign management.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "nginx",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "rabbitmq",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "Campaign",
        "serviceType": "ruby",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "Campaign DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Delivery",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Delivery DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "mkt_affiliate": {
    "id": "mkt_affiliate",
    "name": "Affiliate Tracking",
    "category": "Marketing",
    "description": "Track affiliate links and payouts.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Affiliate Client",
        "serviceType": "react",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Affiliate API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "mkt_events": {
    "id": "mkt_events",
    "name": "Event Registration",
    "category": "Marketing",
    "description": "Ticket sales and attendee management.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Events Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sqs",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "media_portfolio": {
    "id": "media_portfolio",
    "name": "Creative Portfolio",
    "category": "Media",
    "description": "Showcase for designers and artists.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Portfolio Client",
        "serviceType": "nextjs",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Portfolio API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "mongodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "media_video": {
    "id": "media_video",
    "name": "Video Streaming",
    "category": "Media",
    "description": "On-demand video platform.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "kong",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "kafka",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "Auth",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "Auth DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Catalog",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Catalog DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "svc_2",
        "label": "Stream",
        "serviceType": "rust_actix",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "db_2",
        "label": "Stream DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_2",
        "source": "gw",
        "target": "svc_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_2",
        "source": "svc_2",
        "target": "db_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_2",
        "source": "svc_2",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "media_podcast": {
    "id": "media_podcast",
    "name": "Podcast Host",
    "category": "Media",
    "description": "Audio hosting and RSS generation.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Podcast Client",
        "serviceType": "vue",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Podcast API",
        "serviceType": "django",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "media_gallery": {
    "id": "media_gallery",
    "name": "Photo Gallery",
    "category": "Media",
    "description": "High-res image hosting and sharing.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Gallery Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sns",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "media_social": {
    "id": "media_social",
    "name": "Niche Social Network",
    "category": "Media",
    "description": "Community for hobbyists.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Social Client",
        "serviceType": "react_native",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Social API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "health_telemed": {
    "id": "health_telemed",
    "name": "Telemedicine App",
    "category": "Healthcare",
    "description": "Video consults and secure messaging.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "kong",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "rabbitmq",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "Patient",
        "serviceType": "java",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "Patient DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Video",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Video DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "svc_2",
        "label": "Chat",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "db_2",
        "label": "Chat DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_2",
        "source": "gw",
        "target": "svc_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_2",
        "source": "svc_2",
        "target": "db_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_2",
        "source": "svc_2",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "health_tracker": {
    "id": "health_tracker",
    "name": "Fitness Tracker",
    "category": "Healthcare",
    "description": "Workout and nutrition logging.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Fitness Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "gcp_functions",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "firestore",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "pubsub",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "gcp_functions",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "health_emr": {
    "id": "health_emr",
    "name": "Micro EMR",
    "category": "Healthcare",
    "description": "Electronic medical records for small clinics.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "EMR Client",
        "serviceType": "angular",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "EMR API",
        "serviceType": "spring_boot",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "health_booking": {
    "id": "health_booking",
    "name": "Appointment Booking",
    "category": "Healthcare",
    "description": "Patient scheduling system.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Booking Client",
        "serviceType": "nextjs",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Booking API",
        "serviceType": "fastapi",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "health_meds": {
    "id": "health_meds",
    "name": "Medication Reminder",
    "category": "Healthcare",
    "description": "Push notifications for prescriptions.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Meds Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sqs",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "fin_budget": {
    "id": "fin_budget",
    "name": "Personal Budgeting",
    "category": "Fintech",
    "description": "Expense tracking and financial goals.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Budget Client",
        "serviceType": "react",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Budget API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "fin_crypto": {
    "id": "fin_crypto",
    "name": "Crypto Portfolio",
    "category": "Fintech",
    "description": "Track wallet balances and market prices.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "kong",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "kafka",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "Wallet",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "Wallet DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Market",
        "serviceType": "rust_actix",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Market DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "fin_invoice": {
    "id": "fin_invoice",
    "name": "Invoicing Tool",
    "category": "Fintech",
    "description": "Generate and send PDF invoices.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Invoice Client",
        "serviceType": "vue",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Invoice API",
        "serviceType": "laravel",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "mysql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "fin_trading": {
    "id": "fin_trading",
    "name": "Algorithmic Trading Bot",
    "category": "Fintech",
    "description": "Automated trading execution.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Trading Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sns",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "fin_lending": {
    "id": "fin_lending",
    "name": "P2P Lending",
    "category": "Fintech",
    "description": "Micro-loans platform.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "nginx",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "rabbitmq",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "Users",
        "serviceType": "java",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "Users DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Loans",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Loans DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "svc_2",
        "label": "Payments",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "db_2",
        "label": "Payments DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_2",
        "source": "gw",
        "target": "svc_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_2",
        "source": "svc_2",
        "target": "db_2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_2",
        "source": "svc_2",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ai_chatbot": {
    "id": "ai_chatbot",
    "name": "Customer Support Bot",
    "category": "AI",
    "description": "RAG-powered support agent.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Chat Client",
        "serviceType": "nextjs",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Chat API",
        "serviceType": "fastapi",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ai_generator": {
    "id": "ai_generator",
    "name": "Image Generator UI",
    "category": "AI",
    "description": "Frontend for Stable Diffusion/Midjourney.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Image Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sqs",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ai_summarizer": {
    "id": "ai_summarizer",
    "name": "Document Summarizer",
    "category": "AI",
    "description": "PDF parsing and LLM summarization.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Docs Client",
        "serviceType": "vue",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Docs API",
        "serviceType": "python",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "mongodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ai_analytics": {
    "id": "ai_analytics",
    "name": "Predictive Analytics",
    "category": "AI",
    "description": "Sales forecasting using ML.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "kong",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "kafka",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "Ingest",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "Ingest DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Predict",
        "serviceType": "python",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Predict DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "ai_voice": {
    "id": "ai_voice",
    "name": "Voice Transcription",
    "category": "AI",
    "description": "Audio to text service.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Voice Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "gcp_functions",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "firestore",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "pubsub",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "gcp_functions",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "game_leaderboard": {
    "id": "game_leaderboard",
    "name": "Global Leaderboard",
    "category": "Gaming",
    "description": "High scores for indie games.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Leaderboard Client",
        "serviceType": "react",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Leaderboard API",
        "serviceType": "nodejs",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "game_matchmaking": {
    "id": "game_matchmaking",
    "name": "Matchmaking Server",
    "category": "Gaming",
    "description": "Player pairing for multiplayer.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "gw",
        "label": "API Gateway",
        "serviceType": "nginx",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "mq",
        "label": "Event Bus",
        "serviceType": "kafka",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 700
        },
        "grid_hint": {
          "col": 2,
          "row": 4
        }
      },
      {
        "id": "svc_0",
        "label": "Lobby",
        "serviceType": "go",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 300
        },
        "grid_hint": {
          "col": 1,
          "row": 2
        }
      },
      {
        "id": "db_0",
        "label": "Lobby DB",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 100,
          "y": 500
        },
        "grid_hint": {
          "col": 1,
          "row": 3
        }
      },
      {
        "id": "svc_1",
        "label": "Session",
        "serviceType": "rust_actix",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db_1",
        "label": "Session DB",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e_gw_0",
        "source": "gw",
        "target": "svc_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_0",
        "source": "svc_0",
        "target": "db_0",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_0",
        "source": "svc_0",
        "target": "mq",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_gw_1",
        "source": "gw",
        "target": "svc_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_db_1",
        "source": "svc_1",
        "target": "db_1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e_mq_1",
        "source": "svc_1",
        "target": "mq",
        "type": "network",
        "animated": true
      }
    ]
  },
  "game_analytics": {
    "id": "game_analytics",
    "name": "Player Analytics",
    "category": "Gaming",
    "description": "Track player retention and events.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "trigger",
        "label": "Events Gateway",
        "serviceType": "api_gateway",
        "variantId": "standard",
        "layer": "infrastructure",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "func1",
        "label": "Event Handler",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "State Table",
        "serviceType": "dynamodb",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "queue",
        "label": "Event Bus",
        "serviceType": "sqs",
        "variantId": "standard",
        "layer": "messaging",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      },
      {
        "id": "func2",
        "label": "Background Worker",
        "serviceType": "aws_lambda",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 500
        },
        "grid_hint": {
          "col": 3,
          "row": 3
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "trigger",
        "target": "func1",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "func1",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "func1",
        "target": "queue",
        "type": "network",
        "animated": true
      },
      {
        "id": "e4",
        "source": "queue",
        "target": "func2",
        "type": "network",
        "animated": true
      },
      {
        "id": "e5",
        "source": "func2",
        "target": "db",
        "type": "network",
        "animated": true
      }
    ]
  },
  "game_inventory": {
    "id": "game_inventory",
    "name": "Game Inventory System",
    "category": "Gaming",
    "description": "Manage virtual items and trades.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Inventory Client",
        "serviceType": "vue",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Inventory API",
        "serviceType": "spring_boot",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  },
  "game_forum": {
    "id": "game_forum",
    "name": "Guild Hub",
    "category": "Gaming",
    "description": "Clan communication and scheduling.",
    "pros": [
      "Production-ready pattern",
      "Scalable architecture"
    ],
    "cons": [
      "Requires proper configuration"
    ],
    "nodes": [
      {
        "id": "client",
        "label": "Forum Client",
        "serviceType": "nextjs",
        "variantId": "standard",
        "layer": "client",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 100
        },
        "grid_hint": {
          "col": 2,
          "row": 1
        }
      },
      {
        "id": "api",
        "label": "Forum API",
        "serviceType": "ruby",
        "variantId": "standard",
        "layer": "compute",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 300
        },
        "grid_hint": {
          "col": 2,
          "row": 2
        }
      },
      {
        "id": "db",
        "label": "Primary DB",
        "serviceType": "postgresql",
        "variantId": "standard",
        "layer": "database",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 400,
          "y": 500
        },
        "grid_hint": {
          "col": 2,
          "row": 3
        }
      },
      {
        "id": "cache",
        "label": "Cache Layer",
        "serviceType": "redis",
        "variantId": "standard",
        "layer": "cache",
        "tags": [],
        "description": "",
        "responsibilities": [],
        "metrics": {
          "expected_rps": null,
          "data_size": null,
          "sla": null
        },
        "position": {
          "x": 700,
          "y": 300
        },
        "grid_hint": {
          "col": 3,
          "row": 2
        }
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "client",
        "target": "api",
        "type": "network",
        "animated": true
      },
      {
        "id": "e2",
        "source": "api",
        "target": "db",
        "type": "network",
        "animated": true
      },
      {
        "id": "e3",
        "source": "api",
        "target": "cache",
        "type": "network",
        "animated": true
      }
    ]
  }
};
