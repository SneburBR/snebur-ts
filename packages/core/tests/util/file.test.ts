import {
    base64ToArrayBuffer, base64ToBlob, changeExtension, 
    getExtension, getFileName, getFileNameWithoutExtension, normalizeExtension, normalizeFileName, saveFile
} from "../../src/util/file";

import { describe, expect, it } from "vitest";

describe("FileUtil", () => {

    describe("base64ToArrayBuffer", () => {

        it("should convert a valid base64 string to an ArrayBuffer", () => {
            const base64 = "SGVsbG8gV29ybGQ=";
            const expected = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]).buffer;
            expect(base64ToArrayBuffer(base64)).toEqual(expected);
        });

        it("should throw an error for an invalid base64 string", () => {
            const base64 = "not a valid base64 string";
            expect(() => base64ToArrayBuffer(base64)).toThrow();
        });
    });

    describe("base64ToBlob", () => {

        it("should convert a valid base64 string to a Blob with the specified MIME type", () => {
            const base64 = "SGVsbG8gV29ybGQ=";
            const mimeType = "text/plain";
            const expected = new Blob([new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100])], { type: mimeType });
            expect(base64ToBlob(base64, mimeType)).toEqual(expected);
        });


        it("should throw an error for an invalid base64 string", () => {
            const base64 = "not a valid base64 string";
            const mimeType = "text/plain";
            expect(() => base64ToBlob(base64, mimeType)).toThrow();
        });
    });

    describe("changeExtension", () => {

        it("should change the extension of a file name to the specified extension", () => {
            const fileName = "example.txt";
            const extension = ".md";
            const expected = "example.md";
            expect(changeExtension(fileName, extension)).toEqual(expected);
        });

        it("should throw an error for a null file name", () => {
            const fileName: string = null;
            const extension = ".md";
            expect(() => changeExtension(fileName, extension)).toThrow();
        });

        it("should throw an error for a null extension", () => {
            const fileName = "example.txt";
            const extension: string = null;
            expect(() => changeExtension(fileName, extension)).toThrow();
        });
    });

    /*
    describe("getBase64FromUrlAsync", () => {
      it("should retrieve the base64 representation of a file from a URL", async () => {
        const url = "https://example.com/example.txt";
        const expected = "data:text/plain;base64,SGVsbG8gV29ybGQ=";
        const result = await getBase64FromUrlAsync(url, false);
        expect(result).toEqual(expected);
      });
  
      it("should ignore errors and return null when isIgnoreError is true", async () => {
        const url = "https://example.com/does-not-exist.txt";
        const result = await getBase64FromUrlAsync(url, true);
        expect(result).toBeNull();
      });
  
      it("should throw an error when isIgnoreError is false and the file cannot be retrieved", async () => {
        const url = "https://example.com/does-not-exist.txt";
        await expect(getBase64FromUrlAsync(url, false)).rejects.toThrow();
      });
    });
    */

    describe("getExtension", () => {

        it("should return the extension of a file path", () => {
            const filePath = "path/to/file.txt";
            const extension = getExtension(filePath);
            expect(extension).toEqual("txt");
        });

        it("should remove the dot from the extension if isRemoveDot is true", () => {
            const filePath = "path/to/file.txt";
            const extension = getExtension(filePath, true);
            expect(extension).toEqual("txt");
        });
    });

    describe("getFileName", () => {
        it("should return the name of a file path", () => {
            const filePath = "path/to/file.txt";
            const fileName = getFileName(filePath);
            expect(fileName).toEqual("file.txt");
        });

        // it("should return the name of a Blob", () => {
        //     const blob = new Blob(["Hello, world!"], { type: "text/plain" });
        //     const fileName = getFileName(blob);
        //     expect(fileName).toEqual("blob-13-text_plain");
        // });

        it("should throw an error if the file path or Blob is not valid", () => {
            expect(() => getFileName(null)).toThrow();
        });
    });

    describe("getFileNameWithoutExtension", () => {
        it("should return the name of a file path without the extension", () => {
            const filePath = "path/to/file.txt";
            const fileName = getFileNameWithoutExtension(filePath);
            expect(fileName).toEqual("file");
        });

        // it("should return the name of a Blob without the extension", () => {
        //   const blob = new Blob(["Hello, world!"], { type: "text/plain" });
        //   const fileName = getFileNameWithoutExtension(blob);
        //   console.log(fileName);
        //   expect(fileName).toEqual("blob-13-text_plain");
        // });

        it("should throw an error if the file path or Blob is not valid", () => {
            expect(() => getFileNameWithoutExtension(null)).toThrow();
        });
    });

    /*
    describe("getMimetype", () => {
      it("should return the MIME type of a file path", () => {
        const filePath = "path/to/file.txt";
        const mimeType = getMimetype(filePath);
        expect(mimeType).toEqual("text/plain");
      });
  
      it("should return the MIME type of a Blob", () => {
        const blob = new Blob(["Hello, world!"], { type: "text/plain" });
        const mimeType = getMimetype(blob);
        expect(mimeType).toEqual("text/plain");
      });
  
      it("should throw an error if the file path or Blob is not valid", () => {
        expect(() => getMimetype(null)).toThrow();
      });
    });
  
  
    describe("getMimetypeFromExtension", () => {
      it("should return the MIME type associated with a given file extension", () => {
        const extension = "txt";
        const mimeType = getMimetypeFromExtension(extension);
        expect(mimeType).toEqual("text/plain");
      });
  
      it("should throw an error if the file extension is not valid", () => {
        expect(() => getMimetypeFromExtension(null)).toThrow();
      });
    });
    */

    describe("normalizeExtension", () => {
        it("should normalize a file extension by ensuring it starts with a period", () => {
            const extension = "txt";
            const normalizedExtension = normalizeExtension(extension);
            expect(normalizedExtension).toEqual(".txt");
        });

        it("should not modify the extension if it already starts with a period", () => {
            const extension = ".txt";
            const normalizedExtension = normalizeExtension(extension);
            expect(normalizedExtension).toEqual(".txt");
        });

        it("should throw an error if the file extension is not valid", () => {
            expect(() => normalizeExtension(null)).toThrow();
        });
    });

    describe("normalizeFileName", () => {
        it("should remove invalid characters from a file name", () => {
            const fileName = "File/With\\Invalid:Characters.txt";
            const normalizedFileName = normalizeFileName(fileName);
            expect(normalizedFileName).toEqual("FileWithInvalidCharacters.txt");
        });
    });

    describe("saveFile", () => {

        it("should save a file with the given content, file name, and MIME type to the user's device", () => {

            const content = "Hello, world!";
            const fileName = "file.txt";
            const mimeType = "text/plain";

            saveFile(content, fileName, mimeType);
            // TODO: Add assertion for file saved to device
        });

        it("should throw an error if any of the parameters are invalid", () => {
            expect(() => saveFile(null, "file.txt", "text/plain")).toThrow();
            expect(() => saveFile("Hello, world!", null, "text/plain")).toThrow();
            expect(() => saveFile("Hello, world!", "file.txt", null)).toThrow();
        });

    });

});