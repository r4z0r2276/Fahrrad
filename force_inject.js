const fs = require('fs');
const file = 'src/routes/admin/+page.server.js';
let text = fs.readFileSync(file, 'utf8');

if (!text.includes("if(cookies.get('adminSession') === 'viewer') return;")) {
    text = text.replaceAll('async ({ request }) => {', "async ({ request, cookies }) => {\n    if(cookies.get('adminSession') === 'viewer') return;");
    text = text.replaceAll('async ({ request, cookies }) => {', "async ({ request, cookies }) => {\n    if(cookies.get('adminSession') === 'viewer') return;");
    text = text.replaceAll('async ({ cookies }) => {', "async ({ cookies }) => {\n    if(cookies.get('adminSession') === 'viewer') return;");
    fs.writeFileSync(file, text);
    console.log("Injected viewer blocking logic using string replace!");
} else {
    console.log("Already injected.");
}
