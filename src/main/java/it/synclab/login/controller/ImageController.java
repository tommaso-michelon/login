package it.synclab.login.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import it.synclab.login.Image;
import it.synclab.login.service.ImageService;

@RestController
public class ImageController {
	
	@Autowired
	private ImageService imageService;
	
	@PostMapping(value = "/upload")
	public Image uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
		System.out.println("Original Image Byte Size - " + file.getBytes().length);
		return imageService.uploadImage(file);
	}

	@GetMapping("/get/{imgName}")
	public Image getImage(@PathVariable("imgName") String imgName) throws IOException {
		return imageService.getImage(imgName);
	}

}
