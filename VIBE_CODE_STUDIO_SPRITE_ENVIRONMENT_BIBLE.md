# VIBE CODE STUDIO — SPRITE & ENVIRONMENT BIBLE

**Version:** 1.0 · **Purpose:** Tái tạo bộ sprite, background, furniture, VFX và UI đồng bộ cho game PixiJS fixed-isometric.  
**Nguồn:** Các artwork concept Vibe Code Studio trong cuộc trò chuyện và `ENGINE_CONTEXT.md`. Đây là **bản mô tả thiết kế**, không phải khẳng định các ảnh concept đã là asset sạch/game-ready.

## 1. Art direction — quy chuẩn toàn cục

**Phong cách:** 2D pixel art cao cấp, cảm hứng game quản lý studio kiểu Kairosoft/Game Dev Story, kết hợp chibi anime hiện đại và cyberpunk dịu nhẹ. Nét pixel rõ, outline navy đậm, các cụm màu có ranh giới, shading dạng pixel cluster 2–4 cấp, tuyệt đối không dùng brush mềm, ảnh chụp, 3D render, glossy gradient hay anti-aliasing làm nhòe pixel. Cảm giác thân thiện, bận rộn, sinh động; không u ám dù bối cảnh ban đêm.

**Phối cảnh:** Fixed isometric 3/4, tile diamond tỉ lệ 2:1. Camera nhìn chéo xuống từ trên cao, thấy mặt bàn và hai cạnh nội thất. Cùng một hướng ánh sáng và góc nhìn trên mọi asset. Không trộn góc nhìn front-on của đồ đạc với scene isometric. Sprite nhân vật cần góc nhìn 3/4 tương thích scene; khi đi có các hướng riêng.

**Màu sắc:**

| Nhóm | Hex gợi ý | Công dụng |
|---|---|---|
| Deep navy | `#08162E`, `#101F3D` | outline, nền UI, khung |
| Midnight blue | `#182B4C`, `#263B60` | tường, bóng đổ |
| Electric cyan | `#38CFFF`, `#67E8F9` | coding, monitor, highlight |
| Neon violet | `#9A64FF`, `#C28AFF` | review, merge, Eve |
| Teal / mint | `#21D6BD`, `#79E8C4` | success, Atlas, Scout |
| Warm amber | `#FFB35C`, `#FFD18C` | đèn treo, cafe, Captain |
| Coral / red | `#FF6B61`, `#FF8654` | error, Sherlock |
| Pale stone | `#D5C7BD`, `#F1D8C6` | gạch lát, sofa sáng |

**Ánh sáng:** Đêm thành phố ngoài cửa kính tím/xanh, ánh sáng nội thất vàng ấm từ đèn treo và đèn bàn; cyan từ màn hình; neon tím từ biển REVIEW/MERGE; ánh sáng pixel có viền sáng tiết chế. Hình ảnh tổng thể cân bằng ấm/lạnh.

**Quy chuẩn file:** PNG RGBA trong suốt, không có chữ/nhãn/khung trong sprite nhân vật và furniture; pixel nearest-neighbor; shadow tách lớp nếu có thể; anchor nhân vật `bottom-center`; mọi frame của cùng animation dùng canvas và anchor thống nhất. Đừng dựa vào kích thước pixel của ảnh AI: sau khi tạo phải chuẩn hóa lại bằng editor hoặc script.

## 2. Character design — 19 nhân vật

**Tỉ lệ nhân vật:** chibi 2.5–3 đầu, đầu lớn ~45% chiều cao, thân nhỏ, chân ngắn, mắt lớn có highlight, tay nhỏ, tóc tách từng cụm pixel; outfit streetwear/techwear tối giản, giày sneaker, headset/microphone hoặc thiết bị đặc trưng. Outline đậm 1–2 px ở độ phân giải gốc. Không làm nhân vật quá giống nhau chỉ bằng đổi màu tóc.

**Quy ước kỹ thuật khuyến nghị:** art master 64×96 px cho nhân vật, render trong game theo tỉ lệ được hiệu chỉnh; xuất frame đồng nhất, vùng chân/mông ở bottom-center. `32×48` chỉ phù hợp bản rất nhỏ; để đạt độ chi tiết concept nên vẽ master lớn rồi downsample bằng nearest-neighbor có kiểm tra thủ công. Bản context trước đây nêu cao khoảng 150 px ở hàng gần, 105 px hàng xa: đây là **display size**, không nhất thiết là kích thước file nguồn.

| Tên | Role | Giới theo context | Nhận diện hình ảnh | Trang phục/phụ kiện | Khí chất |
|---|---|---|---|---|---|
| **Nova** | builder | Nam | Tóc xanh cobalt dựng nhọn, mắt xanh, tai nghe cyan | Áo khoác công nghệ xanh dương viền cyan, quần tối, sneaker | Năng động, dev chủ lực |
| **Orion** | builder | Nam | Tóc navy gần đen, mái xéo, mắt xanh | Hoodie/tech jacket xanh đậm, chi tiết vàng nhỏ, headset | Điềm tĩnh, tập trung |
| **Vega** | builder | Nam | Tóc xanh băng nhạt, mái nhiều lớp | Jacket xanh bạc, viền cyan, giày tối | Trẻ trung, nhanh nhẹn |
| **Atlas** | builder | Nam | Tóc teal xanh ngọc, hơi rối | Áo xanh ngọc/đen, cổ áo sáng, tai nghe nhỏ | Thân thiện, thực tế |
| **Comet** | builder | Nam | Tóc bạc pha lavender, tóc xù nhẹ | Áo navy với viền trắng/tím nhạt | Tinh nghịch, sáng tạo |
| **Lyra** | builder | Nam | Tóc xanh dương đậm, mái dài lệch | Jacket xanh lam, headset xanh | Bình tĩnh, chăm chỉ |
| **Sage** | reviewer | Nữ | Tóc tím đậm dài, mái bằng, mắt tím | Áo tím/navy, nơ hoặc chi tiết cổ nhỏ | Nghiêm túc, sắc sảo |
| **Iris** | reviewer | Nữ | Tóc hồng coral, đuôi tóc bồng | Outfit hồng–navy, điểm trắng | Vui vẻ, biểu cảm |
| **Juno** | reviewer | Nữ | Tóc lavender sáng, mái dài, mắt tím | Áo tím nhạt/trắng, chi tiết xanh | Dịu dàng, tỉ mỉ |
| **Echo** | reviewer | Nữ | Tóc tím than gần đen, thẳng, mái dài | Outfit navy–violet, tai nghe nhỏ | Trầm lặng, phân tích |
| **Pixel** | design | Nữ | Tóc xanh băng, mái mềm, phụ kiện tai nghe | Jacket sky-blue/trắng, bảng vẽ nhỏ | Sáng tạo, dễ thương |
| **Captain** | dispatcher | Nam | Tóc đen xù, kính/headset hoặc phụ kiện vàng | Jacket vàng cam–đen, thắt lưng tiện ích | Tự tin, điều phối |
| **Eve** | merger | Nữ | Tóc lavender tím ánh cyan, hai búi/đuôi tóc mềm, ánh mắt sáng | Tech jacket tím–cyan, phụ kiện hologram | Linh hoạt, nổi bật, trung tâm merge |
| **Oracle** | spec-validator | Nữ | Tóc xanh lam sâu/tím than, mắt xanh lạnh | Outfit navy xanh sâu, phụ kiện dạng biểu tượng check | Chính xác, bí ẩn |
| **Sherlock** | error-analyzer | Nam | Tóc đỏ cam dựng xù, mắt sắc | Jacket đen–đỏ/cam, chi tiết cảnh báo | Sắc sảo, hoạt bát |
| **Herald** | spec-publisher | Nam | Tóc tím đậm, mái chéo | Outfit tím–đồng, phụ kiện tài liệu | Chỉn chu, đáng tin |
| **Scout** | spec-init | Nữ | Tóc xanh mint, mũ cap/beret xanh trắng | Áo xanh lá–cyan, balo hoặc tablet | Hiếu kỳ, khám phá |
| **Muse** | brainstorm | Nữ | Tóc hồng sáng dài, mái bồng, phụ kiện nhỏ | Outfit hồng–tím, tablet/laptop | Đáng yêu, giàu ý tưởng |
| **Cartographer** | graph | Nữ | Tóc xanh lục bảo/teal dài, mắt xanh | Outfit emerald–navy, bản đồ/tablet | Thông minh, quan sát |

**Lưu ý:** Một số concept atlas từng có nhân vật `Inspector`; nhân vật này **không thuộc bảng role chuẩn trong ENGINE_CONTEXT.md**. Không thêm vào roster 19 người nếu backend không có ID tương ứng.

### 2.1. Character turnaround / sprite actions

Mỗi nhân vật nên có:

- `idle`: 4 frame, thở nhẹ/chớp mắt.
- `walk_down`, `walk_up`, `walk_left`, `walk_right`: mỗi hướng 4–6 frame, thay chân và vung tay thật, không chỉ lắc toàn sprite.
- `work`: 6–8 frame, ngồi quay lưng/3-4 lưng, gõ bàn phím; **không vẽ ghế hoặc bàn vào sprite**.
- `sit`: 4 frame, ngồi nghỉ, tay đặt trên đùi.
- `talk`: 4 frame, tay/miệng chuyển động.
- `emote`: các frame riêng `happy`, `surprised`, `sleepy`, `error`, `idea`.

Để tương thích với engine hiện tại, ánh xạ tối thiểu `stand`, `walk`, `work`, `sit`; các pose bổ sung là nâng cấp. Với `work`, bắt buộc dùng góc quay lưng 3/4 phù hợp bàn làm việc (không phải nhân vật nhìn thẳng camera trong khi monitor ở phía trước).

### 2.2. Prompt chuẩn nhân vật (English)

```text
Create a single game-ready 2D pixel-art character sprite for Vibe Code Studio.
Character: [NAME]. Role: [ROLE]. Identity: [EXACT HAIR, FACE, OUTFIT, ACCESSORIES].
Visual style: premium cozy chibi pixel art inspired by classic Japanese management simulation games, crisp pixel clusters, dark navy outlines, flat 3-step cel shading, expressive large eyes, 2.7-head-tall proportions, modern techwear, warm friendly character design.
Camera: consistent 3/4 isometric-compatible character view, matching a 2:1 isometric office scene.
Pose: [POSE AND VIEW DIRECTION]. Full body, centered, feet/bottom-center anchor.
Output: ONE isolated sprite, genuine transparent alpha background, no floor, no cast shadow, no chair, no desk, no labels, no text, no frame, no other characters. Maintain exact identity and outfit across all frames.
No painterly gradients, no anti-aliasing, no 3D render, no smooth vector art.
```

**Prompt cho work từ phía sau:**

```text
Same exact character identity and costume as reference. Sitting upright at an invisible desk, seen from rear 3/4, back of head and jacket visible, both arms reaching forward as if typing, knees bent forward, seat anchored bottom-center. No desk, no chair, no monitor, no props, no floor, transparent alpha. Consistent canvas and body scale.
```

**Quy trình chống lệch identity:** tạo `stand` chuẩn → tạo turnaround front/rear/left/right → tạo các animation từ đúng reference của nhân vật đó; không tạo 19 nhân vật và hàng trăm frame trong một lần sinh ảnh.

## 3. Environment — khung cảnh studio

**Mô tả tổng thể:** Một văn phòng phát triển phần mềm ấm cúng ở tầng cao của tòa nhà giữa thành phố đêm. Cửa kính lớn chạy dọc tường trên/phải, bên ngoài là skyline tím xanh với cửa sổ sáng vàng. Sàn gạch/beige ấm; tường và trụ màu navy, gỗ nâu ấm; nhiều cây xanh, đèn treo, bảng kế hoạch và monitor xanh cyan. Không gian là một office liền mạch, nhìn từ góc fixed-isometric 3/4, chia khu bằng tủ, vách thấp, bảng neon thay vì phòng kín.

### 3.1. Phân vùng scene

1. **Cafe (trái/trên):** quầy gỗ có máy pha cafe, tủ kệ cốc, vài bàn tròn gỗ, ghế đẩu, cây xanh, biển neon cam `CAFE`, ánh đèn vàng ấm. Agent rảnh ngồi cafe.
2. **Spec & Plan / Dispatcher (trên/giữa):** bảng trắng có flowchart, sticky notes, bàn điều phối, tủ sách và cây; Captain đứng hoặc ngồi ở đây.
3. **Coding (giữa):** 6 workstation xếp **2 hàng × 3 cột**, monitor đôi phát sáng cyan, bàn gỗ sáng/kim loại, ghế xoay navy, bàn phím, cốc nước, cây mini. Để trống ghế khi render background sạch nếu engine sẽ đặt agent vào.
4. **Review (trái/dưới):** dãy bàn monitor với vách ngăn tím, biển `REVIEW` neon violet, bảng checklist; reviewer làm việc ở đây.
5. **Merge (phải/trên):** trạm riêng của Eve với màn hình hologram xanh/tím, nền platform navy, biển `MERGE` violet, ánh sáng cyan đặc trưng.
6. **Relax (phải/dưới):** sofa da nâu/cam, sofa sáng, bàn thấp, đệm xanh teal, beanbag xanh, cây cảnh, biển `RELAX` cam, đèn vàng. Có thể có mèo nằm trên sofa như một chi tiết trang trí tùy chọn.

**Cảm giác bố cục:** nhiều vật thể và hoạt động nhưng vẫn thấy lối đi; vùng coding là tâm thị giác, merge là điểm nhấn sáng nhất, cafe/relax tạo cân bằng ấm. Tránh để bảng HUD nằm trong artwork nền nếu HUD sẽ do code render.

### 3.2. Background variants

- `office_empty.png`: toàn bộ kiến trúc cố định, **không nhân vật, không UI HUD**, có tường, sàn, cửa sổ, đèn gắn tường; đồ nội thất tương tác nên tách riêng.
- `office_preview.png`: scene đầy đủ có furniture để kiểm tra art direction, **không dùng làm nền runtime nếu furniture cũng render riêng**.
- `city_night.png`: skyline qua kính, tách layer nếu muốn parallax rất nhẹ (dù camera cố định).
- `foreground_occlusion.png`: vách trước, cây cao, cạnh bàn hoặc vật thể có thể che chân nhân vật, PNG alpha.

### 3.3. Prompt background sạch

```text
A premium cozy 2D isometric pixel-art game environment for Vibe Code Studio, a modern AI game development office at night. Fixed 3/4 isometric view, 2:1 diamond tile perspective, spacious connected office floor, warm beige stone tiles, deep navy structural walls, floor-to-ceiling windows overlooking a blue-violet neon city skyline, warm amber pendant lights, subtle cyan screen ambience, soft violet accents, many small plants and wooden details. Spatial zones: cafe at upper left, planning at upper middle, central six-desk coding area, review at lower left, merge platform at upper right, relax lounge at lower right. Architectural shell ONLY: floors, walls, windows, fixed lighting. No people, no movable desks, no chairs, no sofas, no UI, no floating labels, no text, no task cards. Clean readable floor with open walkable paths. Crisp pixel clusters, consistent isometric geometry, no blur, no photographic textures, no smooth 3D rendering. Landscape 2:1 composition.
```

## 4. Furniture & prop catalog

Mỗi món là một **asset riêng PNG RGBA** ở góc isometric đồng nhất, bottom-center hoặc bottom-footprint anchor; tuyệt đối không có nền checkerboard giả, viền card hoặc chữ.

| Nhóm | Danh mục | Đặc điểm |
|---|---|---|
| Workstations | `desk_single`, `desk_dual_monitor`, `desk_review`, `desk_merge` | Mặt gỗ sáng, chân kim loại navy, monitor cyan/violet, bàn phím |
| Chairs | `chair_office_blue`, `chair_office_black`, `stool_wood` | Ghế xoay tựa cao, chân bánh xe, có góc lưng 3/4 |
| Cafe | `cafe_counter`, `coffee_machine`, `round_table`, `cup`, `cabinet_cafe` | Gỗ nâu, máy pha cafe bạc, đèn cam |
| Lounge | `sofa_brown`, `sofa_cream`, `armchair`, `beanbag_blue`, `coffee_table` | Chất liệu mềm, màu ấm, gối teal |
| Planning | `whiteboard`, `task_board`, `sticky_note_board`, `bookshelf` | Giấy note nhiều màu, bảng trắng không chứa chữ khó đọc |
| Tech | `server_rack`, `pc_tower`, `holo_screen`, `water_cooler` | Navy, đèn LED cyan/violet |
| Decor | `plant_small`, `plant_large`, `hanging_plant`, `pendant_light`, `wall_neon` | Cây xanh dày pixel, đèn vàng, biển neon riêng |
| Architecture | `floor_tiles`, `wall_tiles`, `window_tiles`, `partition`, `door` | Diamond 2:1, modular, ghép seamless |

**Tỉ lệ khuyến nghị:** tile nền 64×32 source pixel; desk chiếm 1–2 tile, ghế ~0.5–1 tile, sofa 2–3 tile. Tỉ lệ chính xác cần hiệu chỉnh theo scene logic và footprint collision. Không phóng to/thu nhỏ asset ngẫu nhiên từng món.

**Prompt đồ nội thất:**

```text
One isolated [OBJECT] furniture sprite for a cozy futuristic game development studio. Premium Japanese simulation-game pixel art, 2:1 isometric projection, 3/4 top-down angle, warm wooden surfaces, dark navy metal structure, cyan monitor highlights and amber practical lighting, crisp 1-2px pixel outlines, limited color palette, consistent scale with 64x32 diamond tiles. Transparent alpha background, no floor, no room, no people, no text, no labels, no frame, no extra objects, full object visible, centered with bottom footprint anchor.
```

## 5. VFX, icons, UI

**VFX phải tách sprite/animation riêng**, không baked vào nhân vật hay background.

| Effect | Hình dạng | Màu | Trigger |
|---|---|---|---|
| `typing` | các ký tự `</>` và pixel code bay nhẹ | cyan | building/work |
| `review` | checklist, kính lúp, tick nhỏ | violet | review |
| `merge` | 2 nhánh git nhập thành 1, vòng hạt sáng | violet/cyan | merging |
| `success` | dấu tick + sao pixel | mint/green | task done |
| `error` | dấu X + glitch pixel | coral/red | blocked/error |
| `idea` | bóng đèn pixel nhấp nháy | amber | brainstorm |
| `idle` | bong bóng `Zzz`, cafe, chat | blue/purple | nghỉ |
| `notification` | bubble dấu chấm than | white/coral | event |
| `selection` | vòng sáng dưới chân, nhấp nháy | cyan | click agent |
| `levelup` | mũi tên neon đi lên | cyan | progress milestone |

**UI:** nền navy rất tối, border 1–2 px xanh cyan, góc bo nhỏ, text pixel font rõ; label role màu theo nhóm; task card tách cột TODO amber / REVIEW violet / DONE teal; progress bar cyan; panel agents có avatar, trạng thái, task, thời gian. UI tốt nhất dựng bằng HTML/CSS hoặc PixiJS text/vector để giữ nội dung động và sắc nét; asset PNG chỉ dành cho icon, border ornament, neon signs.

**Prompt VFX:**

```text
Single isolated pixel-art game VFX animation element: [EFFECT]. Crisp glowing pixel particles, compact readable silhouette, cyan/violet/teal accent palette, transparent alpha background, no scene, no characters, no words, no border, no background glow rectangle. Suitable for 2D game compositing. Create evenly spaced animation frames with stable center anchor.
```

## 6. Asset pipeline để thực sự dùng được trong PixiJS

1. **Tạo từng loại riêng:** character turnaround, từng pose, furniture, tile, VFX; không dùng một infographic chứa mọi thứ để crop tự động.
2. **Tạo PNG alpha thật:** kiểm tra alpha channel bằng code; ảnh có checkerboard được vẽ vào pixel **không phải transparent**.
3. **Làm sạch:** bỏ viền thừa, artefact, bóng nền giả, chữ; bảo toàn nét pixel.
4. **Chuẩn hóa:** mỗi frame cùng kích thước, anchor, hướng sáng, tỉ lệ; kiểm tra không nhảy vị trí khi animation.
5. **Ghép atlas:** dùng TexturePacker/Aseprite hoặc script xuất spritesheet + JSON metadata; lưu từng PNG gốc để dễ sửa.
6. **Tách occlusion:** furniture có phần trước/sau nhân vật nếu cần; depth sorting theo tọa độ chân (`y`).
7. **Mapping runtime:** role/name → asset ID; `phase` → animation; giữ ID ổn định qua các lần poll.
8. **Kiểm thử trực tiếp trong scene:** ghế có vừa nhân vật không, bàn có che tay không, hướng `work` có khớp monitor không, có lộ nền hoặc pixel fringe không.

### File tree gợi ý

```text
public/assets/
  environment/
    office_empty.png
    office_preview.png
    city_night.png
    foreground_occlusion.png
  tiles/
    floor.atlas.png
    floor.atlas.json
    walls.atlas.png
    walls.atlas.json
  furniture/
    desk_dual_monitor.png
    chair_office_blue.png
    cafe_counter.png
    sofa_brown.png
    ...
  characters/
    nova/
      stand.png
      idle.png
      walk_down.png
      walk_up.png
      walk_left.png
      walk_right.png
      work_rear_3q.png
      sit.png
      manifest.json
    eve/
      ...
  effects/
    typing.png
    merge.png
    success.png
    error.png
  ui/
    signs/
    icons/
```

### Manifest mẫu

```json
{
  "id": "Nova",
  "role": "builder",
  "basePath": "/assets/characters/nova/",
  "anchor": [0.5, 1],
  "animations": {
    "idle": { "file": "idle.png", "frames": 4, "fps": 3 },
    "walk_down": { "file": "walk_down.png", "frames": 6, "fps": 8 },
    "walk_up": { "file": "walk_up.png", "frames": 6, "fps": 8 },
    "work": { "file": "work_rear_3q.png", "frames": 6, "fps": 5 },
    "sit": { "file": "sit.png", "frames": 4, "fps": 2 }
  }
}
```

> Đây là schema **đề xuất**, cần điều chỉnh đúng loader/atlas format trong source hiện tại. Nếu dùng spritesheet ngang, cần thêm `frameWidth`, `frameHeight` và cách chia frame.

## 7. Quy tắc đồng bộ hình ảnh và engine

- Giữ nguyên nhận diện từng nhân vật trong mọi pose: tóc, màu mắt, trang phục, phụ kiện.
- `work` phải là góc lưng 3/4, hai tay hướng bàn phím; không vẽ sẵn monitor, bàn, ghế vào sprite.
- Nhân vật `idle` có thể đi cafe/relax, nhưng đó là **animation trang trí**, không phải hành vi thật của AI.
- Chỉ render HUD động bằng code; không dùng background chứa tên agent/task đã vẽ cố định.
- `agents[]` là agent đang làm việc; `benchAgents[]` là agent nghỉ; tên agent là ID ổn định; `/api/state` poll 3 giây.
- Không tạo shadow trong sprite nhân vật nếu renderer đã có shadow riêng.
- Mọi vật thể có footprint collision riêng, không suy collision từ bounding box ảnh.
- Với scene cố định, chỉ cần một hệ camera thống nhất; không tự thay góc nhìn giữa các asset.

## 8. Prompt master để dùng lại

```text
VIBE CODE STUDIO MASTER ART STYLE:
Premium cozy Japanese game-management pixel art, charming chibi anime characters, modern AI software development studio, fixed 3/4 isometric camera, 2:1 diamond-tile projection, crisp pixel clusters, dark navy 1–2 pixel outlines, controlled 3-step cel shading, expressive tiny character details, warm amber indoor lighting mixed with electric cyan monitors and soft violet neon, wooden furniture, plants, futuristic yet homey office at night, blue-purple city skyline through large windows. Unified scale and lighting, no smooth gradients, no photorealism, no painterly brush, no 3D rendering, no anti-aliased blurry edges. Asset-specific constraints: isolated object/character, true transparent PNG alpha, no labels, no text, no background, no frames or UI containers.
```

**Negative prompt dùng chung:** `photorealistic, 3d render, glossy, smooth vector, watercolor, oil painting, blurred pixels, antialiasing, perspective mismatch, inconsistent scale, extra limbs, extra characters, text, watermark, infographic layout, fake checkerboard background, cropped object, cast shadow baked into sprite`.

## 9. Thứ tự sản xuất tối ưu

**Batch A:** 19 character master + 4 hướng cơ bản để khóa identity.  
**Batch B:** walk/work/sit cho 4 nhân vật Nova, Sage, Eve, Captain, lắp thử scene.  
**Batch C:** hoàn tất animation cho 15 nhân vật còn lại.  
**Batch D:** office_empty, floor/wall/window tiles, furniture riêng, occlusion.  
**Batch E:** VFX, icon, neon signs, UI ornament, QA toàn scene.

**Tiêu chí nghiệm thu:** Sprite có alpha thật; mọi pose đồng nhất; asset không chứa label/UI; background sạch không có nhân vật; đồ nội thất đúng hướng camera; agent ngồi đúng ghế và bàn; không có double-render; không nhảy frame; không mờ pixel khi scale; role/phase từ API hiển thị đúng.
