import { toDataURL as createQrCode } from 'qrcode'

export const useQrCode = (text: MaybeRef<Nullable<string>>) => computedAsync(async () => {
  const value = unref(text)
  if (!value) return null;
  const qrCodeDataUrl = await createQrCode(value)
  return qrCodeDataUrl
})
