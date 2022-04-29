package it.synclab.login;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.persistence.ForeignKey;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
@Table(name="nft", uniqueConstraints = { @UniqueConstraint(name = "UniqueNameAndOwner", columnNames = { "name", "owner_mail" }) })
//@IdClass(MyNft.class)
public class MyNft implements Serializable{
	
	@Id @Column(name="id") @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private Double price;
	
	@OneToOne(cascade=CascadeType.REMOVE) @JoinColumn(name="image_id", foreignKey = @ForeignKey(name="nft_image"))
	private Image image;
	
	@ManyToOne @JoinColumn(name="owner_mail", foreignKey = @ForeignKey(name="nft_owner"))
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
