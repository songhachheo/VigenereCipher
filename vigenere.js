/*
    CSCV337 Web Programming 
*/

function encrypt(plaintext, key) {
    if (key === "") {
        throw "Key is Empty!";
    }
    if (keyHasNum(key) == true) {
        throw "Key contains a number.";
    }

    if (keyHasSpecial(key) == true) {
        throw "Key contains special characters!"
    }

    if (plaintext === "") {
        throw "Plaintext Is Empty!";
    }

    if (key === null) {
        throw "Key Is Null!";
    }

    if (plaintext === null) {
        throw "Plaintext Is Null!";
    }

    keyResult = validateKey(key);
    var ciphertext = "";
    var keyIndex = 0;
    for (var i = 0; i < plaintext.length; i++) {
        var c = plaintext[i];
        if (isUpperCase(c)) {
            var mValue = (c.charCodeAt(0) - 65);
            var kValue = (keyResult[keyIndex % keyResult.length].toUpperCase().charCodeAt() - 65);
            var a = (mValue + kValue)
            var upperCase = ((a % 26) + 26) % 26
            ciphertext += String.fromCharCode(upperCase + 65);
            keyIndex++;
        } else if (isLowerCase(c)) {
            var mValue = (c.charCodeAt() - 97);
            var kValue = (keyResult[keyIndex % keyResult.length].toLowerCase().charCodeAt() - 97);
            var a = (mValue + kValue)
            var lowerCase = ((a % 26) + 26) % 26
            ciphertext += String.fromCharCode(lowerCase + 97);
            keyIndex++;
        } else {
            ciphertext += c;
        }
    }
    return ciphertext;
}

function decrypt(ciphertext, key) {
    if (key === "") {
        throw "Key Is Empty!";
    }

    if (key === null) {
        throw "Key Is Null!";
    }

    if (keyHasNum(key) == true) {
        throw "Key contains a number.";
    }

    if (keyHasSpecial(key) == true) {
        throw "Key contains special characters!"
    }

    if (ciphertext === "") {
        throw "Ciphertext Is Empty!";
    }

    if (ciphertext === null) {
        throw "Ciphertext Is Null!";
    }
    keyResult = validateKey(key);
    var plaintext = "";
    var keyIndex = 0;
    for (var i = 0; i < ciphertext.length; i++) {
        var c = ciphertext[i];
        if (isUpperCase(c)) {
            var cValue = (c.charCodeAt(0) - 65);
            var kValue = (keyResult[keyIndex % keyResult.length].toUpperCase()).charCodeAt() - 65;
            var a = (cValue - kValue)
            var upperCase = ((a % 26) + 26) % 26
            plaintext += String.fromCharCode(upperCase + 65);
            keyIndex++;
        } else if (isLowerCase(c)) {
            var cValue = (c.charCodeAt(0) - 97);
            var kValue = (keyResult[keyIndex % keyResult.length].toLowerCase()).charCodeAt() - 97;
            var a = (cValue - kValue)
            var lowerCase = ((a % 26) + 26) % 26
            plaintext += String.fromCharCode(lowerCase + 97);
            keyIndex++;
        } else {
            plaintext += c;
        }
    }
    return plaintext;
}

function btnEncrypt() {
    var key = document.getElementById("key");
    var plaintext = document.getElementById("plaintext");
    document.getElementById("btnEncrypt");
    ciphertext.value = encrypt(plaintext.value, key.value);
    return ciphertext;
}

function btnDecrypt() {
    var key = document.getElementById("key");
    var ciphertext = document.getElementById("ciphertext");
    document.getElementById("btnDecrypt");
    plaintext.value = decrypt(ciphertext.value, key.value);
    return plaintext;
};

function validateKey(key) {
    key = key.toString();
    if (/\s+/.test(key)) {
        key = key.split(' ').join('');
        return key;
    }
    else {
        return key;
    }
}

function isUpperCase(letter) {
    var letter = letter.charCodeAt();
    if (letter > 64 && letter < 91) {
        return true;
    } else {
        return false;
    }
}

function isLowerCase(letter) {
    var letter = letter.charCodeAt();
    if (letter > 96 && letter < 123) {
        return true;
    } else {
        return false;
    }
}

function isLetter(letter) {
    if (isLowerCase(letter) || isUpperCase(letter)) {
        return true;
    } else {
        return false;
    }
}

function keyHasNum(key) {
    for (var i = 0; i < key.length; i++) {
        if (!isNaN(key.charAt(i)) && !(key.charAt(i) === " ")) {
            return true;
        }
    }
}

function keyHasSpecial(key) {
    const specialchars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialchars.test(key);
}