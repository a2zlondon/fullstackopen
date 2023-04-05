sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: New note sent as JSON (content and date) not from the field in the HTML

    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The rendering of the list is done client side