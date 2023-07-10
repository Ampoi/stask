export async function loadFonts () {
    const webFontLoader = await import('webfontloader')
  
    webFontLoader.load({
      google: {
        families: ['Noto+Sans+JP:400,600,800&display=swap'],
      },
    })
  }