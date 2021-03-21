package com.fmi.relovut.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginUserDto {
    @NotNull
    public String email;

    @NotNull
    public String password;

	public String getEmail() {
		return email;
	}

	public LoginUserDto setEmail(String email) {
		this.email = email;
		return this;
	}

	public String getPassword() {
		return password;
	}

	public LoginUserDto setPassword(String password) {
		this.password = password;
		return this;
	}
}
