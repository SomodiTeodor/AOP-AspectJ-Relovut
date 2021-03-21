package com.fmi.relovut.dto.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class AddFriendDto {
    @Email
    @NotNull
    public String email;

	public String getEmail() {
		return email;
	}

	public AddFriendDto setEmail(String email) {
		this.email = email;
		return this;
	}
}
