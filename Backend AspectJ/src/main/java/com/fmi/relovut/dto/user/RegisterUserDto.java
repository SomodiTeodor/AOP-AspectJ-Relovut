package com.fmi.relovut.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.internal.NotNull;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RegisterUserDto {
	
	public RegisterUserDto() {
		
	}
	
    public RegisterUserDto(@Email String email, @Length(min = 8, max = 64) String password, String fullname,
			String currencyIsoName) {
		super();
		this.email = email;
		this.password = password;
		this.fullname = fullname;
		this.currencyIsoName = currencyIsoName;
	}

	@NotNull
    @Email
    private String email;

    @NotNull
    @Length(min = 8, max = 64)
    private String password;

    @NotNull
    private String fullname;

    @NotNull
    private String currencyIsoName;

	public String getEmail() {
		return email;
	}

	public RegisterUserDto setEmail(String email) {
		this.email = email;
		return this;
	}

	public String getPassword() {
		return password;
	}

	public RegisterUserDto setPassword(String password) {
		this.password = password;
		return this;
	}

	public String getFullname() {
		return fullname;
	}

	public RegisterUserDto setFullname(String fullname) {
		this.fullname = fullname;
		return this;
	}

	public String getCurrencyIsoName() {
		return currencyIsoName;
	}

	public RegisterUserDto setCurrencyIsoName(String currencyIsoName) {
		this.currencyIsoName = currencyIsoName;
		return this;
	}
}
