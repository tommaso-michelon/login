package it.synclab.login;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
@Table(name="nft")
@IdClass(MyNft.class)
public class MyNft implements Serializable{
	@Id
	private String name;
	@Column(nullable = false)
	private Double price;
	/*@Column(nullable = false)
	private String image;*/
	@ManyToOne @JoinColumn(name="image_id")
	private Image image;
	@Id @ManyToOne @JoinColumn(name="owner_mail")
	private User owner;	//owner's mail
	
	public MyNft(String name, Image image, double price, User owner) {
		this.name = name;
		this.owner = owner;
		this.price = price;
		this.image = image;
	}
	
	protected MyNft() {}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public User getOwner() {
		return owner;
	}
	
	@JsonSetter("owner")
	public void setOwner(Object owner) {
		ObjectMapper mapper = new ObjectMapper();
		User pojo = mapper.convertValue(owner, User.class);
		//System.out.println("setOwner User 1 arg - mail: "+ pojo.getMail());
		this.owner = new User(pojo.getMail(), pojo.getPassword());
	}
	/*
	public void setOwner(String mail, String password) {
		this.owner = new User(mail, password);
		System.out.println("setOwner String 2 arg");
	}
	
	public void setOwner(String mail) {
		this.owner = new User(mail, "");
		System.out.println("setOwner String 1 arg");
	}*/
	
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public Image getImage() {
		return image;
	}
	
	public void setImage(Image image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "MyNft [name=" + name + ", owner=" + owner + ", price=" + price + ", image=" + image
				+ "]";
	}
	
}
