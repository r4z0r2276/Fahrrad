const fs = require('fs');
const file = 'src/routes/admin/+page.server.js';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(/(\w+):\s*async\s*\(\{\s*(.*?)\s*\}\)\s*=>\s*\{/g, (match, methodName, argsInfo) => {
  if (methodName === 'logout') return match;
  let args = argsInfo;
  if (!args.includes('cookies')) {
    args = args ? args + ', cookies' : 'cookies';
  }
  return `${methodName}: async ({ ${args} }) => {\n    if (cookies.get('adminSession') === 'viewer') return fail(403);`;
});

// Ensure fail is imported
if (!data.includes('fail,')) {
    data = data.replace("import { redirect } from '@sveltejs/kit';", "import { redirect, fail } from '@sveltejs/kit';");
}

fs.writeFileSync(file, data);
console.log("Injected viewer blocking logic!");
