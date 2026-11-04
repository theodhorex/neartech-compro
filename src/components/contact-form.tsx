"use client";

import { useState, type FormEvent } from "react";
import { contentId } from "@/content/id";
import { submitContact } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const { form } = contentId.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Nama wajib diisi.";
    }

    if (!email.trim()) {
      newErrors.email = "Alamat surel wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format alamat surel tidak valid.";
    }

    if (!message.trim()) {
      newErrors.message = "Pesan kebutuhan wajib diisi.";
    } else if (message.trim().length < 5) {
      newErrors.message = "Mohon jelaskan kebutuhan minimal dalam beberapa kata.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const res = await submitContact({
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || undefined,
        message: message.trim(),
      });

      if (res.success) {
        setStatus("success");
        setStatusMessage(form.successMessage);
        // Reset form
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
        setErrors({});
      } else {
        setStatus("error");
        setStatusMessage(res.message || form.errorMessage);
      }
    } catch {
      setStatus("error");
      setStatusMessage("Terjadi kendala saat mengirim. Silakan coba kembali.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setStatusMessage("");
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="p-8 sm:p-10 border border-line bg-bg flex flex-col items-start gap-4"
      >
        <div className="flex items-center gap-3 text-emerald-800">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" aria-hidden="true" />
          <h3 className="font-serif text-xl sm:text-2xl text-ink">
            Pesan Terkirim
          </h3>
        </div>
        <p className="text-sm sm:text-base text-ink/70 leading-relaxed">
          {statusMessage}
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-4 text-xs font-mono uppercase tracking-wider text-ink/60 hover:text-ink underline focus-visible:outline-2 focus-visible:outline-ink"
        >
          Kirim pesan lain
        </button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-8 md:p-10 border border-line bg-bg space-y-6"
    >
      {/* Pesan status error jika ada */}
      {status === "error" && (
        <div
          role="alert"
          className="p-4 border border-rose-200 bg-rose-50/50 text-rose-900 text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Baris Nama & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs uppercase tracking-wider font-mono text-ink/70 mb-2"
          >
            {form.nameLabel} <span className="text-rose-600" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            disabled={status === "submitting"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={form.namePlaceholder}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-3.5 py-2.5 text-sm bg-bg border ${
              errors.name ? "border-rose-400 focus:border-rose-600" : "border-line focus:border-ink"
            } rounded-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-ink transition-colors`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-rose-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs uppercase tracking-wider font-mono text-ink/70 mb-2"
          >
            {form.emailLabel} <span className="text-rose-600" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            disabled={status === "submitting"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={form.emailPlaceholder}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-3.5 py-2.5 text-sm bg-bg border ${
              errors.email ? "border-rose-400 focus:border-rose-600" : "border-line focus:border-ink"
            } rounded-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-ink transition-colors`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-rose-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Perusahaan (Opsional) */}
      <div>
        <label
          htmlFor="contact-company"
          className="block text-xs uppercase tracking-wider font-mono text-ink/70 mb-2"
        >
          {form.companyLabel}{" "}
          <span className="text-ink/40 font-normal lowercase">{form.companyOptional}</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          disabled={status === "submitting"}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={form.companyPlaceholder}
          className="w-full px-3.5 py-2.5 text-sm bg-bg border border-line rounded-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-ink transition-colors"
        />
      </div>

      {/* Ceritakan Kebutuhan Anda */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs uppercase tracking-wider font-mono text-ink/70 mb-2"
        >
          {form.messageLabel} <span className="text-rose-600" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          disabled={status === "submitting"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={form.messagePlaceholder}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full px-3.5 py-2.5 text-sm bg-bg border ${
            errors.message ? "border-rose-400 focus:border-rose-600" : "border-line focus:border-ink"
          } rounded-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-ink transition-colors leading-relaxed`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-rose-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Tombol Kirim */}
      <div>
        <Button
          type="submit"
          size="md"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? form.submittingButton : form.submitButton}
        </Button>
      </div>
    </form>
  );
}
