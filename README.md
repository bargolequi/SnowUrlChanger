# ServiceNow Redirector

A simple Firefox extension that redirects to a ServiceNow incident page based on the `sys_id` parameter from the current URL.

## Features

- Adds an icon to the toolbar.
- Checks if the current URL matches the ServiceNow incident format.
- Extracts the `sys_id` parameter from the URL.
- Redirects to the formatted ServiceNow incident URL.

## Installation

1. Clone this repository or download the ZIP file.
   ```bash
   git clone https://github/yourusername/service-now-redirector.git
2. Open link in browser. 
   Firefox:
   ```bash
   about:debugging#/runtime/this-firefox
   Chrome:
   ```bash
   chrome://extensions/
3. Select the `manifest.json` file from the proper extension folder.
4. The icon should appear in browser. You can make it always visable if you want to.

