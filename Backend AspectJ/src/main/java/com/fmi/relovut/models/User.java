package com.fmi.relovut.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    public Long getId() {
    	return id;
    }
    
    public User setId(Long id) {
    	this.id = id;
    	return this;
    }

    @NotNull
    private String email;
    
    public String getEmail() {
    	return email;
    }
    
    public User setEmail(String email) {
    	this.email = email;
    	return this;
    }

    @NotNull
    private String password;
    
    public String getPassword() {
    	return password;
    }
    
    public User setPassword(String password) {
    	this.password = password;
    	return this;
    }

    @NotNull
    private String fullname;
    
    public String getFullname() {
    	return fullname;
    }
    
    public User setFullname(String fullname) {
    	this.fullname = fullname;
    	return this;
    }

    @ManyToMany
    @JoinTable(name = "friends",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "friendId")
    )
    @JsonIgnoreProperties("friendOf")
    private List<User> friends = new ArrayList<>();
    
    public List<User> getFriends() {
    	return friends;
    }
    
    public User setFriends(List<User> friends) {
    	this.friends = friends;
    	return this;
    }

    @ManyToMany(mappedBy = "friends")
    @JsonIgnoreProperties("friends")
    private List<User> friendOf = new ArrayList<>();
    
    public List<User> getFriendOf() {
    	return friendOf;
    }
    
    public User setFriendOf(List<User> friendOf) {
    	this.friendOf = friendOf;
    	return this;
    }

    @OneToOne(mappedBy = "user", optional = false)
    private Account account;
    
    public Account getAccount() {
    	return account;
    }
    
    public User setAccount(Account account) {
    	this.account = account;
    	return this;
    }

    @Version
    @Column(name = "version", columnDefinition = "integer DEFAULT 0", nullable = false)
    private Long version = 0L;
    
    public Long getVersion() {
    	return version;
    }
    
    protected User setVersion(Long version) {
    	this.version = version;
    	return this;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) return false;
        if (!(obj instanceof User))
            return false;
        if (obj == this)
            return true;
        return this.getId().equals(((User) obj).getId());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", fullname='" + fullname + '\'' +
                ", account=" + account.getId() +
                ", version=" + version +
                '}';
    }
}
