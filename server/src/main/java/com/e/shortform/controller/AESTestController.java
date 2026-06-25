package com.e.shortform.controller;

import com.e.shortform.util.AES256Util;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
public class AESTestController {

    private final AES256Util aes256Util;

    public AESTestController(AES256Util aes256Util) {
        this.aes256Util = aes256Util;
    }

    @PostMapping("/api/v1/aes/enc")
    public String enc(HttpServletRequest request) throws NoSuchPaddingException, InvalidAlgorithmParameterException, IOException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException {
        String data = IOUtils.toString(request.getInputStream(), "UTF-8");
        return encode(aes256Util.aesEncode(data));
    }

    @PostMapping("/api/v1/aes/dec")
    public String dec(HttpServletRequest request) throws NoSuchPaddingException, InvalidAlgorithmParameterException, IOException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException {
        String data = IOUtils.toString(request.getInputStream(), "UTF-8");
        return aes256Util.aesDecode(decode(data));
    }

    public String decode(String data) throws UnsupportedEncodingException {
        byte[] byteStr = Base64.decodeBase64(data.getBytes());
        return new String(byteStr, "UTF-8");
    }

    public String encode(String data) throws UnsupportedEncodingException {
        byte[] byteStr = Base64.encodeBase64(data.getBytes());
        return new String(byteStr, "UTF-8");
    }

}
