import { existsSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(projectRoot, "dist");
const archivePath = join(projectRoot, "autheo-devhub-landing.zip");

if (!existsSync(join(distDir, "index.html"))) {
  throw new Error("dist/index.html is missing; the production build did not complete.");
}

rmSync(archivePath, { force: true });

const command =
  process.platform === "win32"
    ? {
        executable: "powershell.exe",
        args: [
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          "Add-Type -AssemblyName System.IO.Compression.FileSystem; " +
            "$zip = [System.IO.Compression.ZipFile]::Open(" +
            "$env:AUTHEO_ARCHIVE, [System.IO.Compression.ZipArchiveMode]::Create); " +
            "try { Get-ChildItem -LiteralPath $env:AUTHEO_DIST -File -Recurse | ForEach-Object { " +
            "$entry = [System.IO.Path]::GetRelativePath($env:AUTHEO_DIST, $_.FullName).Replace('\\', '/'); " +
            "[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(" +
            "$zip, $_.FullName, $entry, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null " +
            "} } finally { $zip.Dispose() }",
        ],
      }
    : {
        executable: "zip",
        // shadw.cloud accepts files only; -D omits explicit directory entries.
        args: ["-q", "-r", "-D", archivePath, "."],
      };

const result = spawnSync(command.executable, command.args, {
  cwd: distDir,
  env: {
    ...process.env,
    AUTHEO_DIST: distDir,
    AUTHEO_ARCHIVE: archivePath,
  },
  stdio: "inherit",
});

if (result.error) {
  throw new Error(`Unable to start ${command.executable}: ${result.error.message}`);
}
if (result.status !== 0) {
  throw new Error(`${command.executable} exited with status ${result.status}`);
}
if (!existsSync(archivePath)) {
  throw new Error("The ZIP command completed without creating the archive.");
}

console.log(`Created ${archivePath}`);
