import fs from 'fs';
const file = 'src/routes/admin/+page.server.js';
let text = fs.readFileSync(file, 'utf8');

text = text.replaceAll('async ({ request }) => {', "async ({ request, cookies }) => {\n    if (cookies?.get('adminSession') === 'viewer') return;");
text = text.replaceAll('async ({ cookies }) => {', "async ({ cookies }) => {\n    if (cookies?.get('adminSession') === 'viewer') return;");
// For the ones already having cookies
text = text.replaceAll('async ({ request, cookies }) => {\n    const data = await request.formData();', "async ({ request, cookies }) => {\n    if (cookies?.get('adminSession') === 'viewer') return;\n    const data = await request.formData();");

fs.writeFileSync(file, text);
console.log("ES Modules successfully injected limits.");
