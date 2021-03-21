package com.fmi.relovut.helpers.email.templates;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

@Component
public class RegisterEmailTemplate {
    public RegisterEmailTemplate(@Value("classpath:templates/register-template.html") Resource registerEmailTemplateFile) throws IOException {
        // Register Email Template
        InputStream stream = registerEmailTemplateFile.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        this.template = reader.lines().collect(Collectors.joining("\n"));
    }

    private final String template;

	public String getTemplate() {
		return template;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((template == null) ? 0 : template.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RegisterEmailTemplate other = (RegisterEmailTemplate) obj;
		if (template == null) {
			if (other.template != null)
				return false;
		} else if (!template.equals(other.template))
			return false;
		return true;
	}
}
