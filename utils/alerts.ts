type ShowMessageParams = {
  message?: string
  type: 'success' | 'danger' | 'info'
  hideOnPress: boolean
}

export function showMessage({
  message,
  type,
  hideOnPress,
}: ShowMessageParams) {}
