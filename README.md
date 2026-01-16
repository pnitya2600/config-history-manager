Config History Manager
======================

**Versioning a Non-Versioned Configuration with Diff-Aware UI**

📌 Overview
-----------

Many internal tools store configuration as a single mutable JSON object, making it difficult to track how configurations evolve over time or understand what changed between saves.

**Config History Manager** introduces versioning to a previously non-versioned configuration entity and exposes this history through a **diff-based UI**.The system allows users to edit configurations, persist immutable versions, and visually compare changes between versions at a field level.

This project is built as a **full-stack application** with a Node.js backend and a React frontend.

🎯 Objectives
-------------

This project fulfills the following goals:

*   Introduce versioning for a non-versioned configuration
    
*   Persist every save as a new immutable version
    
*   Compute diffs between versions
    
*   Render a diff-aware UI to visualize changes
    
*   Ensure backend saves are context-aware
    
*   Avoid hardcoding and support arbitrary JSON shapes
    

🏗️ Architecture
----------------

```text
config-history-manager/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── configRoutes.js
│   ├── data/
│   │   ├── store.js
│   │   └── initialConfig.js
│   └── utils/
│       └── diff.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── configApi.js
│   │   ├── components/
│   │   │   ├── ConfigEditor.jsx
│   │   │   ├── VersionHistory.jsx
│   │   │   └── DiffViewer.jsx
│   │   └── styles/
│   │       └── jsondiffpatch.css
└── README.md


🔧 Backend Design
-----------------

### Versioning Model

*   Each configuration save creates a **new immutable version**
    
*   Versions are uniquely identified using UUIDs
    
*   Versions are timestamped and ordered by creation time
    
*   Older versions remain accessible and unchanged
    

Each version stores:

*   Full configuration snapshot
    
*   Diff from the previous version
    
*   Metadata (timestamp, optional comment)
    

### Context-Aware Saves

When saving a new configuration:

1.  The backend fetches the latest version
    
2.  Computes a diff against the new configuration
    
3.  Rejects the save if no changes are detected (stale save)
    
4.  Persists a new immutable version otherwise
    

This ensures saves are **context-aware**, not blind overwrites.

### Diff Strategy

*   Diffs are computed using **jsondiffpatch**
    
*   Field-level detection:
    
    *   Added fields
        
    *   Removed fields
        
    *   Modified values
        
*   Nested object changes are fully supported
    
*   **Array strategy:** index-based comparison(This was chosen for simplicity and predictability and is explicitly defined)
    

### Persistence Choice

**Strategy used:** Full snapshots + diffs (hybrid)

**Justification:**

*   Simple to reason about and debug
    
*   Easy to restore older versions
    
*   Efficient enough for the required constraints (~1MB JSON, ~100 versions)
    
*   Avoids complexity of reconstructing state from chained diffs
    

### Backend APIs

MethodEndpointDescriptionGET/configFetch latest configurationPOST/config/saveSave new versionGET/config/versionsList all versionsGET/config/diff?from=&to=Compute diff between two versions

🎨 Frontend Design
------------------

### Configuration Editor

*   Dynamically renders configuration from JSON
    
*   Allows editing and saving
    
*   No field-specific logic or JSX
    
*   Works for any configuration shape
    

### Version History View

*   Lists all saved versions
    
*   Displays version ID and timestamp
    
*   Allows selecting two versions for comparison
    

### Diff-Based UI

*   Visual comparison between two versions
    
*   Clear highlighting of:
    
    *   🟢 Added values
        
    *   🔴 Removed values
        
    *   🟡 Modified values
        
*   Nested diffs are readable
    
*   Uses jsondiffpatch HTML formatter
    
*   No hardcoded assumptions about schema
    

🚫 No Hardcoding
----------------

*   UI logic is completely data-driven
    
*   No field names or schema assumptions
    
*   Works for arbitrary JSON configurations
    

⚙️ Non-Functional Considerations
--------------------------------

*   Clear separation of concerns (API, storage, diff logic, UI)
    
*   Predictable state management
    
*   Designed to handle:
    
    *   ~1MB JSON payloads
        
    *   ~100 versions
        
*   Clean, readable, and maintainable code
    

⭐ Bonus Features
----------------

*   **Stale save detection**Saves are rejected if no changes are detected, avoiding unnecessary version creation.
    

_(Restore previous version via UI was considered but not implemented, as it was marked optional.)_

🚀 Running the Project Locally
------------------------------

### Backend

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd backend  npm install  npm run dev   `

Backend runs on:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:5050   `

### Frontend

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd frontend  npm install  npm run dev   `

Frontend runs on:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   http://localhost:5174   `

🧠 Summary
----------

This project demonstrates:

*   A practical versioning strategy
    
*   Correct diff semantics
    
*   Thoughtful backend design
    
*   Dynamic, schema-agnostic frontend rendering
    
*   Clear reasoning about trade-offs and constraints
    

The solution is intentionally simple, correct, and extensible, focusing on **engineering judgment over unnecessary complexity**.