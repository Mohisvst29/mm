import { MenuSection } from '../types/menu';
import { SpecialOffer } from '../types/menu';

export const menuSections: MenuSection[] = [
  {
    id: 'section-hot-coffee',
    title: 'القهوة الساخنة',
    icon: '☕',
    items: [
      { id: 'item-1', name: 'قهوة عربي', price: 10, calories: 5, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة عربية تقليدية' },
      { id: 'item-2', name: 'قهوة تركي', price: 10, calories: 8, image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة تركية أصيلة' },
      { id: 'item-3', name: 'اسبريسو', price: 12, calories: 3, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة إيطالية كلاسيكية' },
      { id: 'item-4', name: 'قهوة اليوم', price: 12, calories: 5, image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة مختارة خصيصاً لهذا اليوم' },
      { id: 'item-5', name: 'اسبريسو ميكاتو', price: 13, calories: 15, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'اسبريسو مع رغوة الحليب' },
      { id: 'item-6', name: 'أمريكانو', price: 13, calories: 5, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة أمريكية كلاسيكية' },
      { id: 'item-7', name: 'قهوة تركي بالحليب', price: 13, calories: 45, image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة تركية مع الحليب الطازج' },
      { id: 'item-8', name: 'كورتادو', price: 14, calories: 35, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'اسبريسو مع حليب دافئ' },
      { id: 'item-9', name: 'فلات وايت', price: 15, calories: 120, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة أسترالية بالحليب المخملي' },
      { id: 'item-10', name: 'لاتيه', price: 16, calories: 150, popular: true, image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة بالحليب الناعم' },
      { id: 'item-11', name: 'كابتشينو', price: 16, calories: 80, popular: true, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة بالحليب المرغي' },
      { id: 'item-12', name: 'هوت شوكلت', price: 16, calories: 200, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'شوكولاتة ساخنة كريمية' },
      { id: 'item-13', name: 'سبانيش لاتيه', price: 17, calories: 180, image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'لاتيه إسباني بالحليب المكثف' },
      { id: 'item-14', name: 'موكا لاتيه', price: 17, calories: 220, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'لاتيه بالشوكولاتة' },
      { id: 'item-15', name: 'V60', price: 19, calories: 5, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة مقطرة بطريقة V60' }
    ]
  },
  {
    id: 'section-cold-coffee',
    title: 'القهوة الباردة',
    icon: '🧊',
    items: [
      { id: 'item-16', name: 'قهوة اليوم باردة', price: 12, calories: 5, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة اليوم مثلجة ومنعشة' },
      { id: 'item-17', name: 'آيس أمريكانو', price: 14, calories: 5, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'أمريكانو مثلج منعش' },
      { id: 'item-18', name: 'آيس لاتيه', price: 17, calories: 160, image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'لاتيه مثلج بالحليب البارد' },
      { id: 'item-19', name: 'آيس سبانيش لاتيه', price: 19, calories: 190, image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'لاتيه إسباني مثلج' },
      { id: 'item-20', name: 'آيس موكا', price: 19, calories: 230, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'موكا مثلج بالشوكولاتة' },
      { id: 'item-21', name: 'آيس دريب', price: 21, calories: 8, image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'قهوة مقطرة باردة' }
    ]
  },
  {
    id: 'section-tea',
    title: 'الشاي',
    icon: '🍵',
    items: [
      { 
        id: 'item-22', 
        name: 'شاي أخضر', 
        price: 8,
        calories: 2,
        description: 'شاي أخضر طبيعي مفيد للصحة',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
        sizes: [
          { size: 'كاسة', price: 8 },
          { size: 'براد صغير', price: 14 },
          { size: 'براد وسط', price: 18 },
          { size: 'براد كبير', price: 25 }
        ]
      },
      { 
        id: 'item-23', 
        name: 'شاي أتاي', 
        price: 8,
        calories: 25,
        popular: true,
        description: 'شاي مغربي تقليدي بالنعناع والسكر',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
        sizes: [
          { size: 'كاسة', price: 8 },
          { size: 'براد صغير', price: 14 },
          { size: 'براد وسط', price: 18 },
          { size: 'براد كبير', price: 25 }
        ]
      },
      { 
        id: 'item-24', 
        name: 'شاي أحمر', 
        price: 8,
        calories: 3,
        description: 'شاي أحمر كلاسيكي',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
        sizes: [
          { size: 'كاسة', price: 8 },
          { size: 'براد صغير', price: 14 },
          { size: 'براد وسط', price: 18 },
          { size: 'براد كبير', price: 25 }
        ]
      }
    ]
  },
  {
    id: 'section-juices',
    title: 'العصيرات الطبيعية',
    icon: '🍹',
    items: [
      { id: 'item-25', name: 'عصير برتقال', price: 19, calories: 110, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'عصير برتقال طازج 100%' },
      { id: 'item-26', name: 'عصير رمان', price: 19, calories: 130, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'عصير رمان طبيعي غني بمضادات الأكسدة' },
      { id: 'item-27', name: 'عصير مانجو', price: 19, calories: 120, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'عصير مانجو استوائي طازج' },
      { id: 'item-28', name: 'عصير ليمون نعناع', price: 19, calories: 60, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'عصير ليمون منعش بالنعناع الطازج' },
      { id: 'item-29', name: 'عصير أفوكادو', price: 21, calories: 180, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'عصير أفوكادو كريمي ومغذي' }
    ]
  },
  {
    id: 'section-mocktails',
    title: 'الموكتيلز والموهيتو',
    icon: '🥤',
    items: [
      { id: 'item-30', name: 'مشروب غازي', price: 10, calories: 140, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'مشروب غازي منعش' },
      { id: 'item-31', name: 'سفن أب موهيتو', price: 19, calories: 120, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'موهيتو منعش بالسفن أب والنعناع' },
      { id: 'item-32', name: 'موهيتو ريتا', price: 19, calories: 90, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'موهيتو بنكهة الليمون والنعناع' },
      { id: 'item-33', name: 'كودرد موهيتو', price: 22, calories: 110, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'موهيتو مميز بالفواكه المختلطة' },
      { id: 'item-34', name: 'آيس كركديه', price: 22, calories: 80, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'كركديه مثلج منعش ومفيد' },
      { id: 'item-35', name: 'آيس تي', price: 22, calories: 70, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'شاي مثلج بنكهات مختلفة' },
      { id: 'item-36', name: 'ريد بول موهيتو', price: 23, calories: 160, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'موهيتو منشط بالريد بول' },
      { id: 'item-37', name: 'بيرة', price: 23, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'بيرة خالية من الكحول' }
    ]
  },
  {
    id: 'section-pizza',
    title: 'البيتزا',
    icon: '🍕',
    items: [
      { 
        id: 'item-38', 
        name: 'بيتزا خضار', 
        price: 12,
        calories: 250,
        description: 'بيتزا بالخضار الطازجة والجبن',
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
        sizes: [
          { size: 'صغير', price: 12 },
          { size: 'وسط', price: 18 },
          { size: 'كبير', price: 24 }
        ]
      },
      { 
        id: 'item-39', 
        name: 'بيتزا دجاج', 
        price: 14,
        calories: 320,
        popular: true,
        description: 'بيتزا بقطع الدجاج المشوي والخضار',
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
        sizes: [
          { size: 'صغير', price: 14 },
          { size: 'وسط', price: 20 },
          { size: 'كبير', price: 27 }
        ]
      },
      { 
        id: 'item-40', 
        name: 'بيتزا مشكل', 
        price: 15,
        calories: 350,
        description: 'بيتزا بخليط من اللحوم والخضار',
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
        sizes: [
          { size: 'صغير', price: 15 },
          { size: 'وسط', price: 20 },
          { size: 'كبير', price: 27 }
        ]
      }
    ]
  },
  {
    id: 'section-manakish',
    title: 'المناقيش والفطاير',
    icon: '🥙',
    items: [
      { id: 'item-41', name: 'مناقيش لبنه عسل', price: 15, calories: 280, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'مناقيش باللبنة والعسل الطبيعي' },
      { id: 'item-42', name: 'مناقيش جبن', price: 15, calories: 320, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'مناقيش بالجبن الطازج' },
      { id: 'item-43', name: 'مناقيش عكاوي', price: 15, calories: 300, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'مناقيش بجبن العكاوي اللذيذ' },
      { id: 'item-44', name: 'مناقيش لحم', price: 15, calories: 380, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'مناقيش باللحم المفروم والبهارات' },
      { id: 'item-45', name: 'مناقيش دجاج', price: 15, calories: 350, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'مناقيش بقطع الدجاج المتبلة' },
      { id: 'item-46', name: 'فطاير جبن', price: 8, calories: 180, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'فطاير محشية بالجبن' },
      { id: 'item-47', name: 'فطاير لبن عسل', price: 8, calories: 160, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'فطاير باللبنة والعسل' },
      { id: 'item-48', name: 'فطاير دجاج', price: 8, calories: 200, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'فطاير محشية بالدجاج' }
    ]
  },
  {
    id: 'section-sandwiches',
    title: 'الساندوتش والبرجر',
    icon: '🥪',
    items: [
      { id: 'item-49', name: 'كروسان', price: 12, calories: 230, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'كرواسان فرنسي طازج ومقرمش' },
      { id: 'item-50', name: 'ساندوتش ثلاث أجبان', price: 15, calories: 420, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'ساندوتش بثلاثة أنواع من الجبن' },
      { id: 'item-51', name: 'ساندوتش حلومي', price: 15, calories: 380, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'ساندوتش بجبن الحلومي المشوي' },
      { id: 'item-52', name: 'ساندوتش فاهيتا', price: 15, calories: 450, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'ساندوتش فاهيتا بالدجاج والخضار' },
      { id: 'item-53', name: 'سندوتش تونه', price: 10, calories: 320, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'ساندوتش تونة بالخضار الطازجة' },
      { id: 'item-54', name: 'سندوتش طاكوس دجاج', price: 12, calories: 380, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'ساندوتش طاكوس بالدجاج المكسيكي' },
      { id: 'item-55', name: 'سندوتش مغربي', price: 10, calories: 350, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'ساندوتش بالطعم المغربي الأصيل' },
      { id: 'item-56', name: 'سندوتش معقوده', price: 10, calories: 300, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'ساندوتش معقودة تقليدي' },
      { id: 'item-57', name: 'برجر دجاج', price: 12, calories: 520, popular: true, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'برجر دجاج مشوي مع الخضار' },
      { id: 'item-58', name: 'برجر لحم', price: 12, calories: 580, popular: true, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'برجر لحم طازج مع الإضافات' }
    ]
  },
  {
    id: 'section-desserts',
    title: 'الحلى',
    icon: '🍰',
    items: [
      { id: 'item-59', name: 'كوكيز', price: 12, calories: 150, image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'كوكيز محضر طازج بالشوكولاتة' },
      { id: 'item-60', name: 'كيك عسل', price: 20, calories: 320, image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'كيك العسل الطبيعي الشهي' },
      { id: 'item-61', name: 'كيك تمر', price: 20, calories: 280, image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'كيك التمر الصحي واللذيذ' },
      { id: 'item-62', name: 'سان سبيستيان', price: 22, calories: 380, image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'تشيز كيك سان سبيستيان الإسباني' },
      { id: 'item-63', name: 'كيك نوتيلا', price: 22, calories: 420, popular: true, image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'كيك النوتيلا الكريمي الشهير' },
      { id: 'item-64', name: 'كرانشي كيك', price: 22, calories: 450, image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'كيك مقرمش بطبقات الشوكولاتة' }
    ]
  },
  {
    id: 'section-shisha',
    title: 'الشيشة',
    icon: '💨',
    items: [
      { id: 'item-65', name: 'معسل بلو بيري', price: 35, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'معسل بنكهة التوت الأزرق المنعشة' },
      { id: 'item-66', name: 'معسل تفاحتين', price: 35, calories: 0, popular: true, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'معسل التفاحتين الكلاسيكي المحبوب' },
      { id: 'item-67', name: 'معسل عنب توت', price: 35, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'معسل بخليط العنب والتوت' },
      { id: 'item-68', name: 'معسل عنب نعناع', price: 35, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'معسل العنب مع النعناع المنعش' },
      { id: 'item-69', name: 'معسل ليمون نعناع', price: 35, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'معسل الليمون والنعناع المنعش' },
      { id: 'item-70', name: 'معسل مستكة', price: 35, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'معسل المستكة العربية الأصيلة' },
      { id: 'item-71', name: 'معسل ميكس', price: 35, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'خليط من النكهات المختارة' },
      { id: 'item-72', name: 'معسل نعناع', price: 35, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'معسل النعناع الطازج والمنعش' },
      { id: 'item-73', name: 'معسل نخلة', price: 35, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'معسل النخلة الفاخر' },
      { id: 'item-74', name: 'تغيير رأس', price: 25, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'تغيير رأس الشيشة بنكهة جديدة' },
      { id: 'item-75', name: 'إضافة ثلج', price: 5, calories: 0, image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'إضافة الثلج للشيشة لتجربة أكثر انتعاشاً' }
    ]
  }
];

export const specialOffers: SpecialOffer[] = [
  {
    id: 'offer-1',
    title: 'عرض الإفطار المميز',
    description: 'قهوة + كرواسون + عصير طازج',
    originalPrice: 43,
    offerPrice: 35,
    validUntil: '31 ديسمبر 2024',
    calories: 355
  },
  {
    id: 'offer-2',
    title: 'عرض المساء الخاص',
    description: 'شاي أتاي + كيك نوتيلا + كوكيز',
    originalPrice: 54,
    offerPrice: 45,
    validUntil: '31 ديسمبر 2024',
    calories: 585
  },
  {
    id: 'offer-3',
    title: 'عرض البيتزا العائلي',
    description: 'بيتزا كبيرة + مشروبين غازي',
    originalPrice: 44,
    offerPrice: 35,
    validUntil: '31 ديسمبر 2024',
    calories: 630
  }
];