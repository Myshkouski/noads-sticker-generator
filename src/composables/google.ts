export const useGoogleSiteVerificationToken = () => {
  const runtimeConfig = useRuntimeConfig()

  return runtimeConfig.public.googleSiteVerificationToken
}
