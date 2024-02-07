import OpengraphImage from '../opengraph-image'

export { alt, contentType, size } from '../opengraph-image'

// We want this image to be part of the "parent" ResolvedMetadata in
// generateMetadata of all pages. In order to achieve this, the
// opengraph-image.tsx file must be in a parent directory of the pages where we
// want this behavior. This is the reason why we have a (localized) folder
// here.
export default async function OpengraphImageLocalized(props: {
  params: { locale: string }
}) {
  return OpengraphImage(props)
}
