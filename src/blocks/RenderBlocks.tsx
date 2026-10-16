import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

// import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
// import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
// import { WorkBlock } from '@/blocks/WorkBlock/Component'
// import { ClientListBlock } from '@/blocks/ClientListBlock/Component'
// import { LatestNewsBlock } from '@/blocks/LatestNewsBlock/Component'
// import { AboutBlock } from '@/blocks/AboutBlock/Component'
// import { CapabilitiesBlock } from '@/blocks/CapabilitiesBlock/Component'
// import { NewsBlock } from '@/blocks/NewsBlock/Component'
// import { ContactBlock } from '@/blocks/ContactBlock/Component'
import { VimeoBlock } from '@/blocks/VimeoBlock/Component'
// import PayloadFormSimple from '@/blocks/PayloadFormSimple/Component'

const blockComponents = {
  // archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  // formBlock: FormBlock,
  mediaBlock: MediaBlock,
  // workBlock: WorkBlock,
  // clientListBlock: ClientListBlock,
  // latestNewsBlock: LatestNewsBlock,
  // aboutBlock: AboutBlock,
  // capabilitiesBlock: CapabilitiesBlock,
  // newsBlock: NewsBlock,
  // contactBlock: ContactBlock,
  vimeoBlock: VimeoBlock,
  // payloadFormSimple: PayloadFormSimple,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="render-block-wrapper" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
