#!/usr/bin/perl

use Image::Magick;

for $cur (@ARGV){
$image = Image::Magick->new;
$stat = $image->Read($cur);
warn($stat) if($stat);
$width = $image->Get('width');
$height = $image->Get('height');

# 幅、高さから枠線の幅(1px を両端で 2px) を引いた大きさに、 (1, 1) から切り抜く。
$image->Crop(width=>$width - 2, height=> $height - 2, x=>1, y=>1);
# 幅、高さ 1px のグレーの枠線を付ける。
$image->Border(width=>1, height=>1, fill=>'#888888');

$stat = $image->Write($cur);
warn($stat) if($stat);
}

undef $image;

