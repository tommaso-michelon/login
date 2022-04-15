package it.synclab.login;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name="nft")
@IdClass(MyNft.class)
public class MyNft implements Serializable{
	@Id
	private String name;
	@Id
	@ManyToOne
	@JoinColumn(name="owner_mail")
	private User owner;
	@Column(nullable = false)
	private String id;
	@Column(nullable = false)
	private double price;
	@Column(nullable = false)
	private String image;
	
	public MyNft(String name, User owner, String id, double price, String image) {
		this.name = name;
		this.owner = owner;
		this.id = id;
		this.price = price;
		this.image = image;
	}
	
	public MyNft() {}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public User getOwner() {
		return owner;
	}
	
	public void setOwner(User owner) {
		this.owner = owner;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public String getImage() {
		return image;
	}
	
	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "MyNft [name=" + name + ", owner=" + owner + ", id=" + id + ", price=" + price + ", image=" + image
				+ "]";
	}
	
}
