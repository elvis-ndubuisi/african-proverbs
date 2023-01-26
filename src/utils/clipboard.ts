function copyToClipboard(target: any): void {
  navigator.clipboard.writeText(target);
}

export default copyToClipboard;
