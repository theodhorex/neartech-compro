export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
}

/**
 * Stub pengiriman formulir kontak.
 * TODO: Belum terhubung ke layanan surel (misalnya Resend, SendGrid, atau webhook backend).
 * Fungsi ini menunda sejenak untuk mensimulasikan latensi jaringan dan mengembalikan respons sukses.
 */
export async function submitContact(
  payload: ContactPayload
): Promise<ContactResponse> {
  // Simulasi validasi payload di sisi server/stub
  if (!payload.email || !payload.name) {
    return {
      success: false,
      message: "Data kontak tidak lengkap.",
    };
  }

  // Simulasi penundaan jaringan 600ms
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    message: "Pesan Anda telah berhasil diterima.",
  };
}
