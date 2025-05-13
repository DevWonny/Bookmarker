// 괄호 내용 지우기
export function RemoveParentheses(text: string) {
  return text.replace(/\s*\(.*?\)/g, '').trim();
}

// 하이픈 내용 지우기
export function RemoveHyphen(text: string) {
  return text.split('-')[0].trim();
}