import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import EastIcon from '@mui/icons-material/East';

import { bannerCard, bannerMask } from '@/styles/ui/banner-card';
import { helvetica } from '@/fonts';

type TBannerCard = {
  image: string;
  biteText: string;
  title: string;
  link: string;
};

export default function BannerCard({
  image,
  biteText,
  title,
  link,
}: TBannerCard) {
  return (
    <Box sx={bannerCard} component='div'>
      <Box component='div' className='mask' sx={bannerMask} />
      <Image src={image} alt={title + 'icon'} width={393} height={322} />
      <div className='content'>
        <div>
          <p>{biteText}</p>
          <h4>{title}</h4>
        </div>
        <Link href={link} className={helvetica.className}>
          Learn more <EastIcon />
        </Link>
      </div>
    </Box>
  );
}
