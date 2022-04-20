package it.synclab.login;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User {
	
	@Id
	private String mail;
	@Column(nullable = false)
	private String password;

	public User(String mail, String password) {
		this.mail = mail;
		this.password = password;
	}
	
	protected User() {}
	
	public String getMail() {
		return mail;
	}
	
	public void setMail(String mail) {
		this.mail = mail;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "User [mail=" + mail + ", password=" + password + "]";
	}
	
}