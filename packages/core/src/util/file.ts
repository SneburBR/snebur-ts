import FileSaver from "file-saver";
import { isEmptyOrWhitespace } from "./string";
import { isBase64 } from "./validation";
import { base64ToString } from "./convert";

const PATH_MODULE = "@snebur/core/util/file";
const invalidPathChars = ["\\", "/", ":", "*", "?", "\"", "<", ">", "|"];
const isNode = typeof window === "undefined";

/**
 * Converts a base64 string to an ArrayBuffer.
 * @param base64 The base64 string to convert.
 * @returns The ArrayBuffer representation of the base64 string.
 * @throws An error if the input string is not a valid base64 string.
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {

    if (!isBase64(base64))
        throw new Error(`${PATH_MODULE}::base64ToArrayBuffer# ${base64} is not a valid base64 string`);

    const binaryString = base64ToString(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);

    for (let i = 0; i < binaryLen; i++)
        bytes[i] = binaryString.charCodeAt(i);

    return bytes.buffer;
}

/**
 * Converts a base64 string to a Blob with the specified MIME type.
 * @param base64 The base64 string to convert.
 * @param mimeType The MIME type of the resulting Blob.
 * @returns The Blob representation of the base64 string.
 * @throws An error if the input string is not a valid base64 string.
 */
export function base64ToBlob(base64: string, mimeType: string): Blob {
    const bytes = base64ToArrayBuffer(base64);
    return new Blob([bytes], { type: mimeType });
}

/**
 * Changes the extension of a file name to the specified extension.
 * @param fileName The name of the file to change the extension of.
 * @param extension The new extension to use.
 * @returns The file name with the new extension.
 * @throws An error if the file name or extension is null or undefined.
 */
export function changeExtension(fileName: string, extension: string): string {

    if (fileName == null)
        throw new Error(`${PATH_MODULE}::changeExtension# ${fileName} is not a valid file name`);

    if (extension == null)
        throw new Error(`${PATH_MODULE}::changeExtension# ${extension} is not a valid file extension`);

    const fileNameWithoutExtension = getFileNameWithoutExtension(fileName);
    const normalizedExtension = normalizeExtension(extension);
    return `${fileNameWithoutExtension}${normalizedExtension}`;
}

/**
 * Retrieves the base64 representation of a file from a URL.
 * @param url The URL of the file to retrieve.
 * @param isIgnoreError Whether to ignore errors and return null instead of throwing an error.
 * @returns A Promise that resolves with the base64 representation of the file.
 * @throws An error if the file cannot be retrieved or converted to base64.
 */
export function getBase64FromUrlAsync(url: string, isIgnoreError: false): Promise<string>
export function getBase64FromUrlAsync(url: string, isIgnoreError: true): Promise<string | null>
export function getBase64FromUrlAsync(url: string, isIgnoreError: boolean): Promise<string | null> {

    //check is Node environment 
    if (isNode) {

        const fs = require("fs");
        const path = require("path");

        const filePath = path.resolve(url);
        const file = fs.readFileSync(filePath);
        const base64 = file.toString("base64");
        return Promise.resolve(base64);
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => {
                if (isIgnoreError)
                    resolve(null);
                else
                    reject(reader.error);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = () => {
            if (isIgnoreError)
                resolve(null);
            else
                reject(new Error(`${PATH_MODULE}::getBase64FromUrlAsync Failed to load ${url}`));
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
    });
}

/**
 * Reads the contents of a Blob as an ArrayBuffer.
 * @param blob The Blob to read.
 * @param isIgnoreError Whether to ignore errors and return null instead of throwing an error.
 * @returns A Promise that resolves with the ArrayBuffer representation of the Blob.
 * @throws An error if the Blob cannot be read or if an error occurs during reading and isIgnoreError is false.
 */
export function getBufferArrayAsync(blob: Blob, isIgnoreError: true): Promise<ArrayBuffer | null>;
export function getBufferArrayAsync(blob: Blob, isIgnoreError: false): Promise<ArrayBuffer>;
export function getBufferArrayAsync(blob: Blob, isIgnoreError: boolean = false): Promise<ArrayBuffer | null> {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = () => {
            if (isIgnoreError)
                resolve(null);
            else
                reject(reader.error);
        };
        reader.readAsArrayBuffer(blob);
    });
}

/**
 * Retrieves the extension of a file name or Blob.
 * @param filePathOrBlob The file path or Blob to retrieve the extension from.
 * @param isRemoveDot Whether to remove the dot from the extension.
 * @returns The extension of the file name or Blob.
 * @throws An error if the file path or Blob is not valid.
 */
export function getExtension(filePathOrBlob: string | Blob, isRemoveDot: boolean = false): string {
    const fileName = getFileName(filePathOrBlob);
    const extension = fileName.split(".").pop()!;
    return isRemoveDot ? extension.replace(".", "") : extension;
}

/**
 * Retrieves the name of a file from a file path or Blob.
 * @param filePathOrBlob The file path or Blob to retrieve the name from.
 * @returns The name of the file.
 * @throws An error if the file path or Blob is not valid.
 */
export function getFileName(filePathOrBlob: string | Blob): string {

    if (filePathOrBlob instanceof Blob)
        return getName(filePathOrBlob);

    if (typeof filePathOrBlob === "string")
        return filePathOrBlob.split("\\").pop()!.split("/").pop()!;

    throw new Error(`${PATH_MODULE}::getFileName# ${filePathOrBlob} is not a valid file path or blob`);
}

/**
 * Retrieves the name of a file from a file path or Blob without the extension.
 * @param filePathOrBlob The file path or Blob to retrieve the name from.
 * @returns The name of the file without the extension.
 * @throws An error if the file path or Blob is not valid.
 */
export function getFileNameWithoutExtension(filePathOrBlob: string | Blob): string {

    const fileName = getFileName(filePathOrBlob);
    return fileName.split(".").shift()!;
}

/**
 * Retrieves the name of a Blob.
 * @param blob The Blob to retrieve the name from.
 * @returns The name of the Blob.
 * @throws An error if the Blob is not valid or has no name.
 */
export function getName(blob: Blob): string {

    if (blob == null)
        throw new Error(`${PATH_MODULE}::getName# ${blob} is not a valid blob`);

    if (isEmptyOrWhitespace(blob.name))
        return `blob-${blob.size}-${normalizeFileName(blob.type)}`;

    return blob.name;
}

/**
 * Retrieves the MIME type of a file from a file path or Blob.
 * @param filePathOrBlob The file path or Blob to retrieve the MIME type from.
 * @returns The MIME type of the file.
 * @throws An error if the file path or Blob is not valid.
 */
export function getMimetype(filePathOrBlob: string | Blob): string {

    if (filePathOrBlob instanceof Blob)
        return filePathOrBlob.type;

    if (typeof filePathOrBlob === "string") {
        const extension = getExtension(filePathOrBlob);
        return getMimetypeFromExtension(extension);
    }
    throw new Error(`${PATH_MODULE}::getMimetype# ${filePathOrBlob} is not a valid file path or blob`);
}

/**
 * Retrieves the MIME type associated with a given file extension.
 * @param extension The file extension to retrieve the MIME type for.
 * @returns The MIME type associated with the file extension.
 * @throws An error if the file extension is not valid.
 */
export function getMimetypeFromExtension(extension: string): string {

    if (extension == null)
        throw new Error(`${PATH_MODULE}::getMimetypeFromExtension# ${extension} is not a valid file extension`);

    throw new Error("Not implemented");
}

/**
 * Normalizes a file extension by ensuring it starts with a period.
 * @param extension The file extension to normalize.
 * @returns The normalized file extension.
 * @throws An error if the file extension is not valid.
 */
export function normalizeExtension(extension: string): string {

    if (extension == null)
        throw new Error(`${PATH_MODULE}::normalizeExtension# ${extension} is not a valid file extension`);

    return extension.startsWith(".") ? extension : `.${extension}`;
}

/**
 * Normalizes a file name by removing invalid characters.
 * @param fileName The file name to normalize.
 * @returns The normalized file name.
 */
export function normalizeFileName(fileName: string): string {

    let result = fileName;
    for (const invalidChar of invalidPathChars)
        result = result.replace(invalidChar, "");
    return result;
}

/**
 * Saves a file with the given content, file name, and MIME type to the user's device.
 * @param content The content of the file to save. Can be a string, Uint8Array, or ArrayBuffer.
 * @param fileName The name to give the saved file.
 * @param mimeType The MIME type of the file to save.
 * @throws An error if any of the parameters are invalid.
 */
export function saveFile(content: string | Uint8Array | ArrayBuffer, fileName: string, mimeType: string): void {

    if (content == null)
        throw new Error(`${PATH_MODULE}::saveFile# ${content} is not a valid file content`);

    if (fileName == null)
        throw new Error(`${PATH_MODULE}::saveFile# ${fileName} is not a valid file name`);

    if (mimeType == null)
        throw new Error(`${PATH_MODULE}::saveFile# ${mimeType} is not a valid file mime type`);
 
    if (isNode) {
        const fs = require("fs");
        const path = require("path");
        const filePath = path.resolve(fileName);
             fs.writeFileSync(filePath, content);
        return;
    }

    const  blob = content instanceof Uint8Array || content instanceof ArrayBuffer
            ? new Blob(["content"], { type: mimeType })
            : new Blob(["content"]);
    FileSaver.saveAs(blob, fileName);
}
