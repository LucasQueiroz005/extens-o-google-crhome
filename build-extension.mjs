import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
const dist = 'dist';
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);

for (const f of ['manifest.json', 'src', 'icons']) {
  fs.cpSync(f, path.join(dist, f), { recursive: true });
}
const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 }
});

archive.directory(dist, false); // Adiciona o conteúdo de 'dist' na raiz do zip
archive.pipe(output);

await archive.finalize();

console.log(`Build gerado em ${dist}/ e ${dist}/extension.zip`);