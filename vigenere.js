/*
    CSCV337 Web Programming - Provided File
    vigenere.js
    Notes:  You may add functions to this script to organize your code.  I've included JavaScript-based QUnit tests
    you can use to validate your implementation of the algorithm, which refer to the encrypt/decrypt functions.
    Include vigenere.js within your HTML file.
*/

var AcharCode = 'A'.charCodeAt(0);
var ZcharCode = 'Z'.charCodeAt(0);
var AZlen = ZcharCode - AcharCode + 1;

function encrypt(plaintext, key) {
    var ciphertext = "";
    // TODO: Put your encryption logic here.  Assign the resulting ciphertext to the ciphertext variable.
    if  (
            (plaintext === "") ||
            (key === "")
        ){
            throw "Missing Key or Text to Encrypt!";
    }
    plaintext = plaintext.replace(/[^\w\s]/gi, "");
    var textLen = plaintext.length;
    var keyLen = key.length;
    for( var i = 0; i < textLen; i++ ){
        var plainLetter = plaintext.charAt(i).toUpperCase();
        if( plainLetter.match(/[^a-zA-Z\s]/g) ){
            ciphertext += plainLetter;
            continue;
        }
        var keyLetter = key.charAt( i % keyLen ).toUpperCase();
        var vigenereOffset = keyLetter.charCodeAt(0) - AcharCode;
        var letterOffset =  ( plainLetter.charCodeAt(0) - AcharCode + Math.abs( AZlen + vigenereOffset ) ) % AZlen;

        ciphertext +=  String.fromCharCode( AcharCode + letterOffset );
    }  
      
    return ciphertext;
};

function decrypt(ciphertext, key) {
    var plaintext = "";
    // TODO: Put your decryption logic here.  Assign the resulting plaintext to the plaintext variable.
    if  (
            (ciphertext === "") ||
            (key === "")
        ){
            throw "Missing Key or Text to Decrypt!";
    }
    var encryptDir = -1 * AZlen ;
    var textLen = ciphertext.length;
    var keyLen = key.length;
    for( var i = 0; i < textLen; i++ ){
        var plainLetter = ciphertext   .charAt(i).toUpperCase();
        if( plainLetter.match(/\s/) ){
            plaintext += plainLetter;
            continue;
        }
        var keyLetter = key.charAt( i % keyLen ).toUpperCase();
        var vigenereOffset = keyLetter.charCodeAt(0) - AcharCode;
        var letterOffset =  ( plainLetter.charCodeAt(0) - AcharCode + Math.abs( encryptDir + vigenereOffset ) ) % AZlen;

        plaintext +=  String.fromCharCode( AcharCode + letterOffset );
    }  
    
    return plaintext;
};

window.onload = function(){
    var key = document.getElementById("key");
    var plaintext = document.getElementById("plaintext");
    var ciphertext = document.getElementById("ciphertext");

    var btnEncrypt = document.getElementById("btnEncrypt");
    var btnDecrypt = document.getElementById("btnDecrypt");
    
    btnEncrypt.onclick = function(){
        ciphertext.value = encrypt(plaintext.value, key.value);
    };
    btnDecrypt.onclick = function(){
        plaintext.value = decrypt(ciphertext.value, key.value);
    };
};