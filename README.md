# Message Police Bot

This Discord bot can perform automatic actions when certain triggers are encountered.
The bot must have the appropriate permissions to perform the actions.

The bot token must be in the file `bot-token`, in the script's directory (without a trailing newline).  
A `config.json` file must exist in the script's directory, with the following format:
```
[
  {
    "triggers": ["trigger1", "trig ger2", "(regex.?trigger)+"],
    "actions": [
      {"kind": "react", "emoji": "1213532653563465"},
      {"kind": "reply", "message": "I'm replying to a trigger"},
      {"kind": "delete"}
    ],
    "ignoreWhitespace": true,
    "isRegex": true
  },
  {
    "triggers": ["trigger3", "trigger4"],
    "actions": [
      {"kind": "react", "emoji": "1213532653563465"},
      {"kind": "react", "emoji": "6835787878342543"},
      {"kind": "reply", "message": "I'm replying to a another trigger"},
      {"kind": "reply", "message": "I'm replying twice to a another trigger"}
    ]
  }
]
```

The root array is an array of objects with the above format.  
`triggers` is an array of strings.  
`actions` is an array of objects with the `kind` property set to one of the below.

Action kinds:
- `react`: must also have a `emoji` property with an emoji id
- `reply`: must also have a `message` property with the reply text
- `delete`: no other property required

`ignoreWhitespace`: if true, both the messages and the filters will be stripped of whitespace.  
`isRegex`: if true, the filters are interpreted as (Javascript) regex.
