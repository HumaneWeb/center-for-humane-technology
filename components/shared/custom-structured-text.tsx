// @ts-nocheck
import React from 'react';
import { renderNodeRule, StructuredText, StructuredTextDocument } from 'react-datocms';
import {
  isHeading,
  isBlockquote,
  isParagraph,
  isRoot,
  isList,
} from 'datocms-structured-text-utils';
import ImageContentBlock from '../blocks/image-content-block';
import NarrativeBlock from '../blocks/narrative-block';
import ApproachBlock from '../blocks/approach-block';
import NewsletterBlock from '../blocks/newsletter-block';
import ThinkingBlock from '../blocks/thinking-block';
import StatsBlock from '../blocks/stats-block';
import ImpactBlock from '../blocks/impact-block';
import CustomImage from './custom-image';
import ColumnsBlock from '../blocks/columns-block';
import GalleryImageInformationBlock from '../blocks/gallery-image-information-block';
import LinksBlock from '../blocks/links-block';
import Cta from './cta';
import AccordionBlock from '../blocks/accordion-block';
import TableBlock from '../blocks/table-block';
import Blockquote from './blockquote';
import HighlightedBlock from '../blocks/highlighted-block';
import { cn } from '@/lib/utils/css.utils';
import Footnote from './footnote';
import GridBlock from '../blocks/grid-block';
import GuideCard from './guide-card';
import GenericCard from './generic-card';
import GenericCardsGrid from '../blocks/generic-cards-grid';
import { is } from 'date-fns/locale';
import RelatedAnchorBlock from '../blocks/related-anchor-block';

export default function CustomStructuredText({
  data,
  defaultRules = false,
  isInnerContainer = false,
  centerContent = false,
}: {
  data: Document | Node | StructuredTextDocument | null | undefined;
  defaultRules: boolean;
  isInnerContainer?: boolean;
  centerContent?: boolean;
}) {
  return (
    <StructuredText
      data={data}
      renderBlock={({ record }) => {
        if (record.__typename === 'ImageContentBlockRecord') {
          return <ImageContentBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'NarrativeBlockRecord') {
          return (
            <NarrativeBlock
              key={record.id}
              {...record}
              extraClass="my-8 mb:mt-[150px] mb:pb-[100px] [&+.narrative-block]:mt-0 pt-0"
              headingExtraClass="mb:text-[39px] mb:mb-[30px]"
            />
          );
        }
        if (record.__typename === 'ApproachBlockRecord') {
          return <ApproachBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'SignUpBlockRecord') {
          return <NewsletterBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'ThinkingBlockRecord') {
          return <ThinkingBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'StatsBlockRecord') {
          return <StatsBlock key={record.id} {...record} extraClassnames="mb:mt-[108px]" />;
        }
        if (record.__typename === 'ImpactBlockRecord') {
          return (
            <ImpactBlock key={record.id} {...record} extraClass="mb:mb-[62px] mb-5 mb:mt-[75px]" />
          );
        }
        if (record.__typename === 'ImageBlockRecord') {
          return (
            <div
              className={cn(
                'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
                record.alignment !== 'left' && record.alignment !== 'right' && 'mb:my-[40px] my-5',
                centerContent && 'px-0!',
              )}
              key={record.id}
            >
              <div
                className={cn(
                  record.alignment === 'left' && 'float-left clear-left mr-6 mb-5 max-w-[410px]',
                  record.alignment === 'right' && 'float-right clear-right mr-5 mb-5 max-w-[410px]',
                )}
              >
                <CustomImage {...record.image} withCaption />
              </div>
            </div>
          );
        }
        if (record.__typename === 'ColumnsBlockRecord') {
          return <ColumnsBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'GenericCardsGridRecord') {
          return <GenericCardsGrid key={record.id} {...record} />;
        }
        if (record.__typename === 'GalleryImageInformationBlockRecord') {
          return <GalleryImageInformationBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'LinksBlockRecord') {
          return <LinksBlock key={record.id} {...record} />;
        }
        if (record.__typename === 'CtaRecord') {
          return (
            <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8" key={record.id}>
              <Cta {...record} />
            </div>
          );
        }
        if (record.__typename === 'AccordionBlockRecord') {
          return (
            <div
              className={cn(
                'mx-auto my-11 max-w-7xl px-4 sm:px-6 lg:px-8',
                isInnerContainer && 'my-0 max-w-full px-0 sm:px-0 lg:px-0',
                centerContent && 'px-0!',
              )}
              key={record.id}
            >
              <AccordionBlock {...record} variant={isInnerContainer ? 'small' : 'default'} />
            </div>
          );
        }
        if (record.__typename === 'TableRecord') {
          return (
            <div
              className={cn(
                'mx-auto my-11 max-w-7xl px-4 sm:px-6 lg:px-8',
                centerContent && 'px-0!',
              )}
              key={record.id}
            >
              <TableBlock {...record} />
            </div>
          );
        }
        if (record.__typename === 'BlockquoteRecord') {
          return (
            <div
              className={cn(
                'mx-auto my-11 max-w-7xl px-4 sm:px-6 lg:px-8',
                centerContent && 'px-0!',
              )}
              key={record.id}
            >
              <Blockquote {...record} />
            </div>
          );
        }
        if (record.__typename === 'HighlightedBlockRecord') {
          return (
            <div className={cn(record.variant === 'with-container-color' && 'mb:pt-28 mb:pb-20')}>
              <div
                className={cn(
                  'mx-auto my-11 max-w-7xl px-4 sm:px-6 lg:px-8',
                  centerContent && 'px-0!',
                  record.variant === 'with-container-color' && 'my-0',
                )}
                key={record.id}
              >
                <HighlightedBlock {...record} />
              </div>
            </div>
          );
        }
        if (record.__typename === 'FootnoteRecord') {
          return (
            <div
              className={cn(
                'mx-auto my-11 max-w-7xl px-4 sm:px-6 lg:px-8',
                centerContent && 'px-0!',
              )}
              key={record.id}
            >
              <Footnote {...record} />
            </div>
          );
        }
        if (record.__typename === 'GridRecord') {
          return (
            <div
              className={cn(
                'grid-block mb:my-11 mx-auto my-5 max-w-7xl px-4 sm:px-6 lg:px-8',
                centerContent && 'px-0!',
              )}
              key={record.id}
            >
              <GridBlock {...record} />
            </div>
          );
        }
        if (record.__typename === 'GuideCardRecord') {
          return <GuideCard key={record.id} {...record} />;
        }
        if (record.__typename === 'GenericCardRecord') {
          return (
            <div
              className={cn(
                'generic-card-record mb:my-18 mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8 [&+.generic-card-record]:mt-4 [&:has(+.generic-card-record)]:mb-0',
                isInnerContainer && 'my-0 h-full max-w-full px-0 sm:px-0 lg:px-0',
                centerContent && 'px-0!',
              )}
              key={record.id}
            >
              <GenericCard {...record} />
            </div>
          );
        }
        if (record.__typename === 'RelatedAnchorBlockRecord') {
          return (
            <div
              className={cn(
                'mx-auto mt-[50px] mb-[75px] max-w-7xl px-4 sm:px-6 lg:px-8',
                centerContent && 'px-0!',
              )}
              key={record.id}
            >
              <RelatedAnchorBlock {...record} />
            </div>
          );
        }

        return null;
      }}
      customNodeRules={
        defaultRules
          ? []
          : [
              renderNodeRule(
                isParagraph,
                ({ adapter: { renderNode }, node, children, key, ancestors }) => {
                  if (isRoot(ancestors[0])) {
                    return (
                      <div
                        className={cn(
                          'paragraph mx-auto mb-[24px] max-w-7xl px-4 sm:px-6 lg:px-8',
                          isInnerContainer && 'max-w-full px-0 sm:px-0 lg:px-0',
                          centerContent && 'px-0!',
                        )}
                        key={key}
                      >
                        {renderNode(
                          'p',
                          {
                            className: cn(
                              'font-sans text-[18px] mb:text-xl font-normal leading-140 text-primary-navy mb-5 max-w-[840px]',
                              centerContent && '',
                              isInnerContainer && 'text-[16px]',
                            ),
                          },
                          children,
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <React.Fragment key={key}>
                        {renderNode(
                          'p',
                          {
                            className: cn(
                              'font-sans text-[18px] mb:text-xl font-normal leading-140 text-primary-navy mb-5 max-w-[840px]',
                              centerContent && '',
                            ),
                          },
                          children,
                        )}
                      </React.Fragment>
                    );
                  }
                },
              ),
              renderNodeRule(
                isHeading,
                ({ adapter: { renderNode }, node, children, key, ancestors }) => {
                  const headingId = node.children[0].value.toLowerCase().replaceAll(' ', '-');

                  return (
                    <div
                      className={cn(
                        'heading mb:mt-[75px] mb:mb-[24px] mx-auto mt-5 mb-5 max-w-7xl items-end px-4 sm:px-6 lg:px-8',
                        isInnerContainer && 'mb-0 max-w-full px-0 sm:px-0 lg:px-0',
                        centerContent && 'px-0!',
                      )}
                      key={key}
                    >
                      {renderNode(
                        `h${node.level}`,
                        {
                          id: headingId,
                          className: cn(
                            'font-sans font-semibold leading-120 mb:leading-130 mb:text-[29px] text-primary-navy max-w-[840px] text-[23px]',
                            centerContent && '',
                            isInnerContainer && 'text-2xl mb-2',
                          ),
                        },
                        children,
                      )}
                    </div>
                  );
                },
              ),
              renderNodeRule(
                isList,
                ({ adapter: { renderNode }, node, children, key, ancestors }) => {
                  if (isRoot(ancestors[0])) {
                    return (
                      <div
                        className={cn(
                          'mx-auto my-10 max-w-7xl items-end px-4 sm:px-6 lg:px-8',
                          centerContent && 'px-2!',
                        )}
                        key={key}
                      >
                        {renderNode('ul', { className: 'list-disc ml-5 [&>li]:mb-5' }, children)}
                      </div>
                    );
                  } else {
                    return <React.Fragment key={key}>{children}</React.Fragment>;
                  }
                },
              ),
            ]
      }
    />
  );
}
