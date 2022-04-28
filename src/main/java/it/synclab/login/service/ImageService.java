package it.synclab.login.service;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import it.synclab.login.Image;
import it.synclab.login.repository.ImageRepository;

@Service
public class ImageService {
	
	@Autowired
	private ImageRepository imageRepository;
	
	public Image uploadImage(MultipartFile file) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	    Image img = new Image(fileName, file.getContentType(), file.getBytes());
	    return imageRepository.save(img);
	    //return ResponseEntity.status(HttpStatus.OK);   type: BodyBuilder
	}
	
	public Image getImage(String name) {
		Image retrievedImage = imageRepository.findByName(name).get();
		Image img = new Image(retrievedImage.getName(), retrievedImage.getType(), retrievedImage.getData());
	    return img;
	}
	/*
	public Stream<Image> getAllFiles() {
	  return imageRepository.findAll().stream();
	}*/
}
