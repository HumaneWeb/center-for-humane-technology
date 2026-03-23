import type { ComponentProps } from 'react';
import AccordionBlock from './accordion-block';
import ButtonsBlock from './buttons-block';
import ContentBlock from './content-block';
import ContentMarkdownBlock from './content-markdown-block';
import ImageBlock from './image-block';
import ImageGalleryBlock from './image-gallery-block';
import { cn } from '@/lib/utils/css.utils';

type EmbedPayload = {
  __typename?: string;
  id: string;
  snippet: string;
};

type ContentItem =
  | {
      __typename: 'ContentBlockRecord';
      id: string;
      title: string;
      content: string;
      hideBlock?: boolean | null;
    }
  | {
      __typename: 'ContentMarkdownRecord';
      id: string;
      content: string;
    }
  | {
      __typename: 'ImageBlockRecord';
      id: string;
      image: ComponentProps<typeof ImageBlock>['image'];
      link: ComponentProps<typeof ImageBlock>['link'];
      hideBlock?: boolean | null;
    }
  | {
      __typename: 'ImageGalleryRecord';
      id: string;
      images: ComponentProps<typeof ImageGalleryBlock>['images'];
    }
  | {
      __typename: 'ButtonsBlockRecord';
      id: string;
      alignment?: string | null;
      buttons: ComponentProps<typeof ButtonsBlock>['buttons'];
    }
  | {
      __typename: 'AccordionBlockRecord';
      id: string;
      items: { id: string; title: string; content: string }[];
      hideBlock?: boolean | null;
    };

type Props = {
  id: string;
  content: ContentItem[] | null | undefined;
  embed: EmbedPayload;
  isTextDark?: boolean;
};

function renderContentItem(block: ContentItem, isTextDark: boolean | undefined) {
  switch (block.__typename) {
    case 'ContentBlockRecord':
      if (block.hideBlock) {
        return null;
      }
      return (
        <ContentBlock title={block.title} content={block.content} isTextDark={isTextDark} align="left" />
      );
    case 'ContentMarkdownRecord':
      return (
        <ContentMarkdownBlock content={block.content} isTextDark={isTextDark} align="left" />
      );
    case 'ImageBlockRecord':
      if (block.hideBlock) {
        return null;
      }
      return (
        <div className="flex justify-start [&>div]:!my-0">
          <ImageBlock image={block.image} link={block.link} />
        </div>
      );
    case 'ImageGalleryRecord':
      return (
        <div className="[&>div]:!my-0">
          <ImageGalleryBlock images={block.images} />
        </div>
      );
    case 'ButtonsBlockRecord':
      return (
        <ButtonsBlock id={block.id} alignment={block.alignment} buttons={block.buttons} isInner />
      );
    case 'AccordionBlockRecord':
      if (block.hideBlock) {
        return null;
      }
      return (
        <AccordionBlock
          items={block.items.map((item) => ({
            id: item.id,
            title: item.title,
            content: item.content,
          }))}
        />
      );
    default:
      return null;
  }
}

function EmbedPanel({ snippet }: { snippet: string }) {
  return (
    <div className="min-w-0 lg:sticky lg:top-8">
      <div
        className="rounded-sm border border-neutral-light-gray bg-neutral-white p-6 shadow-sm text-primary-navy"
        dangerouslySetInnerHTML={{ __html: snippet }}
      />
    </div>
  );
}

/** Landing modular block: copy/modules on the left, raw embed (e.g. HubSpot) on the right. */
export default function ContentCtaEmbedBlock({ content, embed, isTextDark }: Props) {
  const items = content ?? [];
  const snippet = embed?.snippet?.trim() ?? '';
  const hasLeft = items.length > 0;
  const hasEmbed = Boolean(snippet);

  if (!hasLeft && !hasEmbed) {
    return null;
  }

  const sectionText = cn(isTextDark && 'text-primary-navy', !isTextDark && 'text-neutral-white');

  if (!hasLeft && hasEmbed) {
    return (
      <section className={cn('mb:mb-13.5 my-5', sectionText)}>
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <EmbedPanel snippet={snippet} />
        </div>
      </section>
    );
  }

  if (hasLeft && !hasEmbed) {
    return (
      <section className={cn('mb:mb-13.5 my-5', sectionText)}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-col gap-8 [&>*]:!my-0">
            {items.map((block) => (
              <div key={block.id}>{renderContentItem(block, isTextDark)}</div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('my-36', sectionText)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <div className="flex min-w-0 flex-col gap-8 [&>*]:!my-0">
            {items.map((block) => (
              <div key={block.id}>{renderContentItem(block, isTextDark)}</div>
            ))}
          </div>
          <EmbedPanel snippet={snippet} />
        </div>
      </div>
    </section>
  );
}
