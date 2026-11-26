import {readFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname,resolve} from 'node:path';
const root=import.meta.dirname;
const assets=JSON.parse(await readFile(resolve(root,'assets.json'),'utf8'));
for(const a of assets){
 const data=await readFile(resolve(root,a.file));
 if(data.length!==a.bytes||createHash('sha256').update(data).digest('hex')!==a.sha256)throw Error('Asset missing or changed: '+a.file);
 const target=resolve(root,'dist',a.file);await mkdir(dirname(target),{recursive:true});await copyFile(resolve(root,a.file),target);
}
await mkdir(resolve(root,'dist'),{recursive:true});
for(const file of ['index.html','BodoniModa-OFL.txt','Jost-OFL.txt'])await copyFile(resolve(root,file),resolve(root,'dist',file));
console.log('Built the Change Your Life hero in dist');
