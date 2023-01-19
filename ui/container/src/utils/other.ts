export const getUrlParameterByName = (
  name: string,
  url = window.location.href
) => {
  const href = url ? url : window.location.href;
  const reg = new RegExp("[?&]" + name + "=([^&#]*)", "i");
  const string = reg.exec(href);
  return string ? string[1] : null;
};

/**
 * @description pluralize a term based on the count it has
 * @export
 * @param {number} count
 * @param {string} singularTerm
 * @param {string} [pluralTerm]
 * @return {*}
 */
export function pluralize(
  count: number,
  singularTerm: string,
  pluralTerm?: string
): string {
  return count > 1 ? pluralTerm || singularTerm + "s" : singularTerm;
}

/**
 * @description limitText takes a string and the limit like params. Cuts it with a limit and returns new string with 3 dots
 * @export
 * @param {number} limit
 * @param {string} text
 * @return {string}
 */

export const limitText = (text: string, limit: number) => {
  return text
    ? `${text.substring(0, limit)}${text.length > limit ? "..." : ""}`
    : "";
};
