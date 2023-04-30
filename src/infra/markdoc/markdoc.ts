import Markdoc from '@markdoc/markdoc'

export const getHTMLfromDoc = async (path: string) => {
  const response = await fetch(`/articles/${path}.md`);
  const document = await response.text();

  const ast = Markdoc.parse(document);
  const content = Markdoc.transform(ast);
  const html = Markdoc.renderers.html(content)
  
  return html
}