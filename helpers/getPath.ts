import path from "path";

export default function getPath(...pathArgs: string[]) {
    const rootPath = process.cwd();
    return path.join(rootPath, ...pathArgs);
}
