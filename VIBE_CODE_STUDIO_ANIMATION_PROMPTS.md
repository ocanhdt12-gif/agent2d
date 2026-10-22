# VIBE CODE STUDIO — PROMPT SỬA ẢNH ANIMATION (ChatGPT)

Ảnh gốc (master): `public/assets/furniture/nova_chair_coding.png` = tư thế **lean_left_type_a** (đã chốt).

## Cách dùng

1. **Mỗi tư thế = 1 lần sửa từ ảnh MASTER**, không sửa nối tiếp từ ảnh vừa sửa (sửa nối tiếp sẽ trôi nhân vật). Riêng frame `_type_b` thì sửa từ frame `_type_a` tương ứng.
2. Mỗi lần: đính kèm ảnh → dán **KHỐI CHUNG** + **KHỐI THAY ĐỔI** của tư thế đó.
3. ChatGPT chỉ xuất 1024×1024 / 1024×1536 / 1536×1024 → chọn **1024×1536 (dọc)**. Kích thước khác master là bình thường; script căn ảnh sẽ dò bánh xe giữa và đưa về đúng canvas/anchor.
4. Nếu kết quả đổi nhân vật (tóc, áo, ghế khác), trả lời ngay trong chat:
   `Too different from the original. Keep the character and chair identical to the original image; only change: <...>`
5. Tải về PNG, kiểm tra nền trong suốt thật (không caro, không trắng). Lưu theo tên ở từng mục vào `public/assets/characters/nova/coding/`.

---

## KHỐI CHUNG (dán đầu mọi prompt sửa)

```text
Edit the attached image. It is a game sprite: Nova, a pixel-art character
seated in an office chair, seen from behind by a fixed isometric camera.

KEEP IDENTICAL unless the CHANGE section says otherwise:
- character identity: spiky cobalt-blue hair, cyan headset with microphone,
  navy hooded tech jacket with cyan trim, dark trousers, blue-and-white sneakers
- the exact same chair: dark navy backrest and seat, cyan seat trim, dark metal
  armrests, five-star wheel base
- same crisp pixel-art style, same dark outline thickness, same palette
- same lighting: warm amber rim light from the upper left, faint cyan bounce
  light from the right
- same overall size and the same position on the canvas; the chair's central
  wheel stays at the same spot, bottom-centre of the image

OUTPUT: portrait 1024x1536 PNG with a genuinely transparent background.
NO checkerboard, NO floor, NO cast shadow, NO desk, NO monitor, NO keyboard,
NO text, NO frame, NO second character, NO second chair.
```

---

## 1. `straight_type_a.png` — ngồi thẳng lưng (sửa từ master)

```text
CHANGE:
- Nova sits perfectly upright and centred on the chair: vertical spine,
  level shoulders, head facing straight ahead toward the desk (away from the
  camera), no lean to the left or right
- both forearms reach forward at keyboard height; both elbows visible just
  outside the torso, symmetric
- knees bent, both feet flat on the floor about shoulder width apart; a bit of
  each sneaker visible on either side of the chair
Everything else stays as in the original.
```

## 2. `lean_right_type_a.png` — nghiêng phải (sửa từ master)

```text
CHANGE:
- Nova's upper body leans about 8-10 degrees to the RIGHT (the opposite of the
  original), as if resting weight on the right armrest; head follows the torso
  and still faces the desk, away from the camera
- hips stay planted in the seat; the chair does not move or rotate
- right forearm forward at keyboard height, left forearm forward too
- left foot now slightly visible on the left of the chair, right foot tucked
Keep the lighting direction exactly as in the original (do NOT mirror the
image): amber rim light still on the upper-left edges.
```

## 3. `lean_left_type_b.png` / `straight_type_b.png` / `lean_right_type_b.png` — frame gõ phím thứ 2

Đính kèm **frame `_type_a` tương ứng** (không phải master).

```text
CHANGE ONLY THE ARMS — this is the second frame of a typing loop:
- right shoulder and right elbow raised very slightly (a few pixels), as if
  lifting the hand to hit a key
- left shoulder and left elbow lowered very slightly, as if pressing a key
- head, hair, headset, torso, legs, chair: pixel-identical to the attached image
```

> Nếu ChatGPT không giữ được giống hệt → bỏ frame B, code sẽ nhún vai 1 px thay thế.

## 4. `talk_left.png` — quay đầu sang trái nói chuyện (sửa từ `straight_type_a`)

```text
CHANGE:
- Nova turns the head about 45 degrees to the LEFT, as if talking to a coworker
  sitting at the next desk on the left: we now see the left ear, the left cheek
  and a small part of the face in profile, mouth slightly open mid-sentence,
  friendly expression
- shoulders follow slightly, rotated about 15 degrees to the left
- left hand lifted a little in a casual talking gesture; right hand stays near
  the keyboard height
- hips, legs and chair do NOT move
```

## 5. `talk_right.png` — quay đầu sang phải nói chuyện (sửa từ `straight_type_a`)

```text
CHANGE:
- Nova turns the head about 45 degrees to the RIGHT, as if talking to a
  coworker sitting at the next desk on the right: we now see the right ear,
  the right cheek and a small part of the face in profile, mouth slightly open
  mid-sentence, friendly expression
- shoulders follow slightly, rotated about 15 degrees to the right
- right hand lifted a little in a casual talking gesture; left hand stays near
  keyboard height
- hips, legs and chair do NOT move
Keep the lighting direction exactly as in the original (do NOT mirror).
```

## 6. `swivel_left.png` — xoay ghế sang trái (sửa từ `straight_type_a`)

```text
CHANGE:
- the chair AND Nova together swivel about 30 degrees to the LEFT around the
  chair's central column, turning away from the desk
- we now see more of the chair's right side and Nova's right side: right
  shoulder, right arm, right knee
- Nova sits relaxed: back against the backrest, both hands resting on the
  armrests, head facing the same direction as the body
- the five-star wheel base and the central wheel stay at the same spot on the
  canvas; only the seat, backrest and body rotate
```

## 7. `swivel_right.png` — xoay ghế sang phải (sửa từ `straight_type_a`)

```text
CHANGE:
- the chair AND Nova together swivel about 30 degrees to the RIGHT around the
  chair's central column, turning away from the desk
- we now see more of the chair's left side and Nova's left side: left
  shoulder, left arm, left knee
- Nova sits relaxed: back against the backrest, both hands resting on the
  armrests, head facing the same direction as the body
- the five-star wheel base and the central wheel stay at the same spot on the
  canvas; only the seat, backrest and body rotate
Keep the lighting direction exactly as in the original (do NOT mirror).
```

---

## 8. `fx/fire_aura.png` — vầng lửa siêu tốc (tạo MỚI, không sửa ảnh)

Đính kèm master để AI biết kích thước bóng người. Code sẽ làm lửa chập chờn (scale, nhấp nháy, xê dịch), nên **chỉ cần 1 ảnh**.

```text
Create ONE pixel-art fire aura effect sprite for a game, sized to surround the
seated character in the attached image (same canvas proportions, same
bottom-centre anchor).

- an oval ring of flames rising around a seated figure: thick at the bottom
  and sides, tongues of flame licking upward above the head height
- the CENTRE IS EMPTY and fully transparent (the character is drawn there
  separately) — do NOT draw the character
- colours: bright yellow-white core, orange body, red-orange edges, a few
  cyan-blue flame tips to match a neon office
- crisp pixel-art clusters, dark-red outlines on the outer flames, no blur,
  no smooth glow gradient, a few small square ember particles above
- portrait 1024x1536, genuinely transparent background
NO character, NO chair, NO floor, NO shadow, NO text, NO frame, NO checkerboard.
```

Tuỳ chọn (nếu muốn lửa động thật): yêu cầu thêm 3 biến thể cùng kích thước, mỗi bản lưỡi lửa khác hình một chút → `fire_aura_00..03.png`.

---

## 9. PROMPT GỘP — gen từng ảnh rồi đóng gói ZIP (1 phiên chat)

Đính kèm `nova_chair_coding.png` rồi dán nguyên khối dưới. Gõ `next` để duyệt, `redo` để gen lại, `zip` để đóng gói.

```text
You will produce a set of animation sprites for my pixel-art game, ONE IMAGE
PER REPLY, then package them into a ZIP at the end.

ATTACHED IMAGE = MASTER. It is Nova, a pixel-art character seated in an office
chair, seen from behind by a fixed isometric camera, leaning slightly left.
Always edit FROM THE MASTER (never from a previous output), except where a
step says otherwise.

KEEP IDENTICAL IN EVERY IMAGE unless the step says otherwise:
- identity: spiky cobalt-blue hair, cyan headset with microphone, navy hooded
  tech jacket with cyan trim, dark trousers, blue-and-white sneakers
- the exact same chair: dark navy backrest and seat, cyan seat trim, dark metal
  armrests, five-star wheel base
- crisp pixel-art style, same dark outline thickness, same palette
- lighting: warm amber rim light from the upper left, faint cyan bounce from
  the right. NEVER mirror the image to make a right-side version.
- same size and position on the canvas; the chair's central wheel stays at
  the same spot, bottom-centre
- portrait 1024x1536 PNG, genuinely transparent background
- NO checkerboard, floor, cast shadow, desk, monitor, keyboard, text, frame,
  second character or second chair

STEPS (filename -> change):
1. straight_type_a.png -> sits perfectly upright and centred, vertical spine,
   level shoulders, head facing the desk (away from camera), both forearms
   forward at keyboard height, both elbows symmetric, knees bent, feet flat
   and shoulder width apart.
2. lean_right_type_a.png -> upper body leans 8-10 degrees to the RIGHT as if
   resting on the right armrest; head follows the torso and faces the desk;
   hips and chair unchanged.
3. lean_left_type_b.png -> FROM THE MASTER, change only the arms: right
   shoulder/elbow raised a few pixels, left shoulder/elbow lowered a few
   pixels (second frame of a typing loop). Everything else pixel-identical.
4. straight_type_b.png -> same arm change as step 3, but FROM IMAGE 1.
5. lean_right_type_b.png -> same arm change as step 3, but FROM IMAGE 2.
6. talk_left.png -> FROM IMAGE 1: head turned about 45 degrees to the LEFT,
   showing the left ear, left cheek and a little of the face in profile,
   mouth slightly open, friendly; shoulders follow about 15 degrees; left hand
   lifted in a casual talking gesture; hips, legs and chair do not move.
7. talk_right.png -> FROM IMAGE 1: same as step 6 but to the RIGHT (right ear,
   right cheek, right hand gesturing).
8. swivel_left.png -> FROM IMAGE 1: chair AND Nova swivel about 30 degrees to
   the LEFT around the chair's central column, turning away from the desk; we
   see more of the right side of chair and body; Nova relaxed, back against
   the backrest, hands on the armrests; wheel base stays in place.
9. swivel_right.png -> FROM IMAGE 1: same as step 8 but to the RIGHT (more of
   the left side visible).
10. fire_aura.png -> NEW image, not an edit: an oval ring of pixel-art flames
   sized to surround the seated character in the master (same canvas and
   anchor). Thick at the bottom and sides, flame tongues rising above head
   height, CENTRE EMPTY and transparent, NO character and NO chair. Yellow-white
   core, orange body, red-orange edges, a few cyan-blue tips, small square
   embers, dark-red outer outlines, no blur, no smooth glow.

RULES:
- Generate exactly ONE image per reply, starting with step 1. Under it write
  only the filename and one line on what changed.
- Then WAIT. If I reply "next", go to the next step. If I reply "redo" (or give
  a correction), regenerate the same step.
- If a result drifts from the master (different hair, outfit or chair),
  regenerate it yourself before showing it.
- When I reply "zip" (or after step 10 is approved), use Python to save every
  approved image with its exact filename as a transparent RGBA PNG, check that
  each image's corner pixels have alpha = 0, and package them into
  nova_coding_sprites.zip with this layout:
    nova/coding/<steps 1-9 filenames>
    fx/fire_aura.png
  Then give me the download link and a table: filename, width x height,
  transparent yes/no.
```

> Nếu ChatGPT báo không truy cập được ảnh đã gen để zip: tải từng ảnh (đúng tên ở cột filename) rồi đặt vào `public/assets/characters/nova/coding/` và `public/assets/fx/` — em sẽ căn ảnh bằng script.

---

## 10. Gen lại `lean_left_type_b.png` (bám `lean_left_type_a`)

Đã duyệt: `lean_left_type_a` (ghế xoay chéo, người quay trái) và `lean_right_type_a/b`. File sai duy nhất: `lean_left_type_b` (đang là bản sao của `lean_right_type_b`).

**Chat mới**, đính kèm `lean_left_type_a.png`:

```text
The attached image is frame A of a 2-frame typing loop for a pixel-art game
sprite: Nova seated in an office chair. Create frame B.

Frame B must be a near-exact copy of the attached image:
- same canvas size (1024x1536), same position, same scale, same chair exactly
  where it is, same central wheel position
- keep the chair at EXACTLY the same angle as attached (turned diagonally,
  three-quarter view). Do NOT straighten it, do NOT rotate it further
- keep the body and head turned EXACTLY as attached, same visible part of the
  face, same expression
- same hair, headset, jacket, trousers, sneakers, colours, outline thickness,
  lighting

ONLY CHANGE (small, a few pixels) — the second key press:
- the shoulder and elbow that are raised in the attached image go down a few
  pixels; the other shoulder and elbow go up a few pixels
Hands stay at keyboard height. Nothing else moves.

OUTPUT: one portrait 1024x1536 PNG with a genuinely transparent background.
NO checkerboard, floor, shadow, desk, monitor, keyboard, text, frame.
```

Nếu kết quả đổi góc ghế / quay đầu khác, trả lời trong cùng chat:
`Wrong: you changed the chair angle / head direction. Start again from the attached image and change ONLY the shoulders and elbows by a few pixels.`

Trước khi lưu: đặt cạnh frame còn lại, lật qua lại — chỉ được thấy vai/khuỷu tay nhúc nhích.

---

## 11. Builder tiếp theo — ORION (thay nhân vật trên 10 frame Nova đã duyệt)

Cách làm: **không gen tư thế mới**. Đưa 10 frame Nova đã duyệt làm khung tư thế, chỉ thay nhân vật → giữ nguyên góc ghế, canvas, anchor, nên code chỉ cần đổi thư mục.

Đính kèm **10 ảnh** trong `public/assets/nova/coding/` (giữ đúng tên file), dán khối dưới — GPT gen hết 10 ảnh rồi tự zip, không dừng hỏi.

```text
You will re-skin a set of 10 approved animation sprites for my pixel-art game
from the character NOVA to a new character ORION, ONE IMAGE PER REPLY, then
package them into a ZIP.

ATTACHED: 10 Nova sprites, named by pose (straight_type_a.png,
straight_type_b.png, lean_left_type_a.png, lean_left_type_b.png,
lean_right_type_a.png, lean_right_type_b.png, talk_left.png, talk_right.png,
swivel_left.png, swivel_right.png). They are the POSE TEMPLATES.

FOR EVERY IMAGE, KEEP IDENTICAL TO THE NOVA TEMPLATE OF THE SAME NAME:
- the pose, body angle, head direction, arm and leg positions, expression
- the chair: same model, same angle, same size, same position on the canvas,
  same central wheel position
- canvas 1024x1536, same scale, same placement
- crisp pixel-art style, same dark outline thickness, same lighting (warm
  amber rim light from the upper left, faint cyan bounce from the right)
- genuinely transparent background; NO checkerboard, floor, cast shadow, desk,
  monitor, keyboard, text, frame, second character or second chair

REPLACE ONLY THE CHARACTER WITH ORION (calm, focused builder):
- hair: neat NAVY-BLACK hair (#1B2340 with dark-blue highlights), smooth
  layered strands with a long SIDE-SWEPT FRINGE falling to the right, short
  and tidy at the back of the neck. Much calmer silhouette than Nova: NO tall
  spikes
- eyes (only where the face is visible in the template): calm deep-blue eyes,
  relaxed small smile
- headset: matte BLACK over-ear headset with thin GOLD accent rings and a
  small gold-tipped microphone
- outfit: DARK NAVY hoodie-style tech jacket (#1E2A4A), hood down, with small
  GOLD/amber details: gold zip pull, thin gold trim lines on the shoulders and
  cuffs, a small gold geometric badge on the upper back
- dark charcoal trousers, dark navy sneakers with white soles and a thin gold
  stripe
- same body proportions as Nova (chibi, big head)
The cyan seat trim belongs to the CHAIR: keep it cyan, unchanged.

DO ALL OF IT IN ONE GO — do not stop to ask me anything between images:
1. Generate straight_type_a.png first; it DEFINES Orion's look.
2. Then generate the other 9 in this order: straight_type_b, lean_left_type_a,
   lean_left_type_b, lean_right_type_a, lean_right_type_b, talk_left,
   talk_right, swivel_left, swivel_right. Each re-skins the Nova template of
   the same name, with Orion looking EXACTLY like image 1 (same hair shape,
   colours, headset, jacket details).
3. If any image drifts (pose, chair angle or position differs from its Nova
   template, or Orion differs from image 1), regenerate it before moving on.
4. When all 10 are done, use Python to save each one with its exact filename
   as a transparent RGBA PNG, check that the corner pixels have alpha = 0, and
   package them as orion_coding_sprites.zip with the layout
   orion/coding/<filename>.
5. Reply with the download link and a table: filename, width x height,
   transparent yes/no.
```

> Nếu ChatGPT dừng giữa chừng (giới hạn số ảnh mỗi lượt) thì nhắn `continue — generate the remaining images, then zip`.

Lưu vào `public/assets/orion/coding/` (đúng tên file). Vầng lửa dùng chung `fx/fire_aura.png`, không cần gen.

Kiểm tra khi duyệt ảnh 1: nhìn từ sau phải nhận ra **khác Nova bằng hình dáng tóc** (mượt, mái xéo, không dựng nhọn), không chỉ đổi màu.

---

## 12. Builder nữ — LYRA (đổi Lyra trong Bible thành nữ)

Giống mục 11: đính kèm **10 ảnh Nova** trong `public/assets/nova/coding/`. Lần này yêu cầu thẳng **1 sheet 5×2 có nhãn** (GPT hay tự gộp) → cắt bằng `scripts/slice-pose-sheet.mjs`.

```text
Re-skin my 10 approved pixel-art game sprites from the character NOVA to a new
female character LYRA, and deliver them as ONE sprite sheet. Do everything in
one go without asking me anything.

ATTACHED: 10 Nova sprites named by pose (straight_type_a, straight_type_b,
lean_left_type_a, lean_left_type_b, lean_right_type_a, lean_right_type_b,
talk_left, talk_right, swivel_left, swivel_right). They are the POSE TEMPLATES.

FOR EVERY POSE, KEEP IDENTICAL TO THE NOVA TEMPLATE OF THE SAME NAME:
- the pose, body angle, head direction, arm and leg positions
- the chair: same model, same angle, same size, cyan seat trim unchanged
- IMPORTANT: swivel_left and swivel_right must show the WHOLE CHAIR AND BODY
  ROTATED diagonally exactly like the Nova templates — not just a head turn
- crisp pixel-art style, same dark outline thickness, same lighting (warm
  amber rim light from the upper left, faint cyan bounce from the right)
- same chibi proportions and the same overall size as Nova

REPLACE ONLY THE CHARACTER WITH LYRA (girl, calm and hard-working builder):
- hair: deep royal-blue hair (#2440A8 with lighter blue highlights) tied in a
  HIGH PONYTAIL that falls down past her shoulders over the top of the chair
  backrest, plus a long side-swept fringe on the left. From behind, the
  ponytail must be the clear silhouette difference from the other builders
- small white star-shaped hair clip next to the ponytail tie
- headset: light sky-blue over-ear headset with small white star decals and a
  thin microphone
- eyes (only where the face is visible in the template): big bright-blue eyes,
  gentle smile, slightly rosy cheeks
- outfit: royal-blue cropped tech jacket with light-blue trim and a small white
  star emblem on the upper back, white T-shirt hem visible at the waist,
  dark navy pleated skirt over black leggings, white-and-blue sneakers

OUTPUT: ONE image, a sprite sheet with 5 columns x 2 rows, in this order:
row 1: straight_type_a, straight_type_b, lean_left_type_a, lean_left_type_b,
       lean_right_type_a
row 2: lean_right_type_b, talk_left, talk_right, swivel_left, swivel_right
- every sprite the same size, chair wheel base on the same baseline in each row
- the exact filename (e.g. "straight_type_a.png") as a small label under each
  sprite, with clear space between the sprite and its label
- genuinely transparent background; NO checkerboard, floor, cast shadow, desk,
  monitor, keyboard, frame or grid lines
```

Nhận sheet về: lưu vào scratchpad, rồi
`node scripts/slice-pose-sheet.mjs <sheet.png> public/assets/lyra/coding 5 2 straight_type_a straight_type_b lean_left_type_a lean_left_type_b lean_right_type_a lean_right_type_b talk_left talk_right swivel_left swivel_right`
→ `node scripts/build-coding-manifest.mjs lyra` → thêm `'lyra'` vào `CHARACTERS` trong `src/coding-test.ts`.

---

## 13. Builder thứ 4 — VEGA (bản prompt chuẩn cho các builder tiếp theo)

Rút kinh nghiệm Orion/Lyra:
- **Nghiêng (lean) KHÔNG xoay ghế** — ghế giữ thẳng như template, chỉ thân trên nghiêng nhẹ 5–8°. Lyra bị xoay ghế quá đà ở lean.
- **Chỉ swivel mới xoay ghế**, vừa phải ~20–25° (Orion thì không xoay chút nào).
- Không xuất được nền trong suốt thì dùng **nền magenta #FF00FF đặc** (script tự xoá) — tránh caro vẽ cứng như Lyra.

Đính kèm **10 ảnh Nova** trong `public/assets/nova/coding/`, dán khối dưới.

```text
Re-skin my 10 approved pixel-art game sprites from the character NOVA to a new
character VEGA, and deliver them as ONE sprite sheet. Do everything in one go
without asking me anything.

ATTACHED: 10 Nova sprites named by pose (straight_type_a, straight_type_b,
lean_left_type_a, lean_left_type_b, lean_right_type_a, lean_right_type_b,
talk_left, talk_right, swivel_left, swivel_right). They are the POSE TEMPLATES.

FOR EVERY POSE, COPY THE NOVA TEMPLATE OF THE SAME NAME:
- same pose, arm and leg positions, head direction
- same chair model and size, cyan seat trim unchanged
- crisp pixel-art style, same dark outline thickness, same lighting (warm
  amber rim light from the upper left, faint cyan bounce from the right)
- same chibi proportions and the same overall size as Nova

CHAIR ANGLE RULES (important):
- straight_*, lean_*, talk_*: the chair is seen STRAIGHT FROM BEHIND, NOT
  rotated at all, exactly like the templates
- lean_left_*: only the upper body tilts slightly (5-8 degrees) to the left;
  hips, legs and chair stay exactly as in straight_type_a
- lean_right_*: same, tilting slightly (5-8 degrees) to the right
- talk_*: only the head and shoulders turn; the chair does not rotate
- swivel_left / swivel_right: the ONLY poses where the chair rotates — chair
  and whole body turned a MODERATE 20-25 degrees to that side (not more), the
  wheel base stays in place

REPLACE ONLY THE CHARACTER WITH VEGA (young, quick, cheerful builder, male):
- hair: pale ICE-BLUE hair (#A8DDF5 with white highlights and soft blue
  shadows), layered and feathery, several short layers flicking outward at the
  back of the head; a little shorter and fluffier than Nova, NO tall spikes
- headset: white over-ear headset with cyan glow rings and a thin microphone
- eyes (only where the face is visible): bright cyan eyes, energetic grin
- outfit: SILVER-BLUE tech jacket (#8FA9C8) with cyan trim lines and a small
  cyan lightning-bolt emblem on the upper back, collar slightly raised
- dark grey trousers, dark charcoal sneakers with cyan laces and white soles

OUTPUT: ONE image, a sprite sheet with 5 columns x 2 rows, in this order:
row 1: straight_type_a, straight_type_b, lean_left_type_a, lean_left_type_b,
       lean_right_type_a
row 2: lean_right_type_b, talk_left, talk_right, swivel_left, swivel_right
- every sprite the same size, chair wheel base on the same baseline in each row
- the exact pose name as a small label under each sprite, with clear space
  between the sprite and its label
- background: genuinely transparent. If you cannot make it transparent, use a
  FLAT SOLID MAGENTA #FF00FF background instead. NEVER draw a checkerboard
- gaps between the legs, under the seat and between the arms must be
  background too (transparent or magenta), never filled with grey or white
- NO floor, cast shadow, desk, monitor, keyboard, frame or grid lines
```

Nhận sheet về:
`node scripts/slice-pose-sheet.mjs <sheet.png> public/assets/vega/coding 5 2 straight_type_a straight_type_b lean_left_type_a lean_left_type_b lean_right_type_a lean_right_type_b talk_left talk_right swivel_left swivel_right`
→ `node scripts/build-coding-manifest.mjs vega` → thêm `'vega'` vào `CHARACTERS`.

Builder sau (Atlas, Comet): copy prompt này, chỉ thay đoạn "REPLACE ONLY THE CHARACTER WITH …" theo Bible.

---

## 14. Builder thứ 5 — ATLAS (prompt ĐỘC LẬP, không re-skin Nova)

Tự do về dáng/trang phục, nhưng khoá chặt những thứ làm hỏng game nếu lệch: **ghế, góc camera, tỷ lệ người/ghế, baseline, quy tắc góc ghế**.

Đính kèm **2 ảnh tham chiếu**: `public/assets/nova/coding/straight_type_a.png` (chỉ để lấy ghế + tỷ lệ + camera) và `public/assets/nova/coding/swivel_left.png` (chỉ để lấy mức xoay ghế).

```text
Design a NEW character, ATLAS, for my pixel-art office game, and draw his 10
work-animation sprites as ONE sprite sheet. Do everything in one go without
asking me anything. You have creative freedom on his look, personality and
gestures — but the HARD LIMITS below must be followed exactly so he fits the
existing game.

ATTACHED REFERENCES (for chair, camera and scale ONLY — do NOT copy the
character, his hair, outfit or exact pose):
- IMAGE 1: a character seated in the game's office chair, seen from behind.
  Copy from it: the chair model, its size, the camera angle, the outline
  thickness, the lighting, and the size of the character relative to the chair.
- IMAGE 2: the maximum chair rotation used in the game (for the swivel poses).

HARD LIMITS (must match the references):
- the SAME chair in every sprite: dark navy backrest and seat, glowing cyan
  seat trim, dark metal armrests, five-star wheel base. Never redesign it
- camera: fixed, slightly high, seen from BEHIND the character
- scale: chair exactly the same size as in IMAGE 1; seated character total
  height about 1.9x the chair height (from the wheels to the top of the hair),
  chibi proportions with a big head (head about 40% of his height)
- the chair's central wheel touches the same baseline in every sprite of a row
- crisp pixel-art clusters, dark 2 px outlines, warm amber rim light from the
  upper left, faint cyan bounce light from the right, no blur, no 3D render
- chair angle rules:
  * straight, lean and talk poses: chair seen STRAIGHT FROM BEHIND, NOT rotated
  * lean poses: only the upper body tilts 5-8 degrees; hips, legs, chair stay put
  * talk poses: only head and shoulders turn toward the side; part of the face
    visible; the chair does not rotate
  * swivel poses: the ONLY ones where the chair rotates, 20-25 degrees max
    (like IMAGE 2), wheel base stays in place
- both hands near keyboard height in all typing poses (straight, lean)

ATLAS (friendly, practical builder, male) — design freely within this brief:
- TEAL / turquoise hair (around #2FB5A8 with lighter mint highlights),
  slightly messy and tousled, clearly different silhouette from a spiky or a
  long-ponytail hairstyle
- a small compact headset (not big over-ear cans)
- outfit in teal and black with a BRIGHT contrasting collar (e.g. mint or
  white); add one personal touch of your choice visible from behind (patch,
  tool loop, stripe, small backpack strap... nothing bulky that hides the chair)
- sneakers of your choice in the same palette
- talk poses: show his friendly personality with your own choice of gesture

THE 10 POSES (5 columns x 2 rows, in this order):
row 1: straight_type_a  (upright, typing, left hand slightly raised)
       straight_type_b  (same, right hand slightly raised — 2nd typing frame)
       lean_left_type_a (upper body tilted left, typing)
       lean_left_type_b (same tilt, other hand raised)
       lean_right_type_a(upper body tilted right, typing)
row 2: lean_right_type_b(same tilt, other hand raised)
       talk_left        (head and shoulders turned to the left, talking)
       talk_right       (head and shoulders turned to the right, talking)
       swivel_left      (chair + body turned 20-25 degrees to the left, relaxed)
       swivel_right     (chair + body turned 20-25 degrees to the right, relaxed)
The a/b frames of each pair must be identical except for the arms.

OUTPUT: ONE image, the sprite sheet above.
- every sprite the same size; the exact pose name as a small label under
  each sprite with clear space between sprite and label
- background: genuinely transparent. If you cannot make it transparent, use a
  FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- gaps between legs, under the seat and between arms = background too
- NO floor, cast shadow, desk, monitor, keyboard, frame or grid lines
```

Nhận sheet về:
`node scripts/slice-pose-sheet.mjs <sheet.png> public/assets/atlas/coding 5 2 straight_type_a straight_type_b lean_left_type_a lean_left_type_b lean_right_type_a lean_right_type_b talk_left talk_right swivel_left swivel_right`
→ `node scripts/build-coding-manifest.mjs atlas` → thêm `'atlas'` vào `CHARACTERS`.

> Prompt độc lập dễ lệch tỷ lệ hơn re-skin. Script manifest tự chuẩn hoá chiều cao (139 px), nên chỉ cần kiểm tra **tỷ lệ người/ghế** — nếu ghế trông to/nhỏ hơn hẳn các builder khác thì gen lại.

---

## 15. Builder cuối — COMET (prompt độc lập, cùng khung mục 14)

Đính kèm 2 ảnh tham chiếu như Atlas: `nova/coding/straight_type_a.png` + `nova/coding/swivel_left.png`.

```text
Design a NEW character, COMET, for my pixel-art office game, and draw his 10
work-animation sprites as ONE sprite sheet. Do everything in one go without
asking me anything. You have creative freedom on his look, personality and
gestures — but the HARD LIMITS below must be followed exactly so he fits the
existing game.

ATTACHED REFERENCES (for chair, camera and scale ONLY — do NOT copy the
character, his hair, outfit or exact pose):
- IMAGE 1: a character seated in the game's office chair, seen from behind.
  Copy from it: the chair model, its size, the camera angle, the outline
  thickness, the lighting, and the size of the character relative to the chair.
- IMAGE 2: the maximum chair rotation used in the game (for the swivel poses).

HARD LIMITS (must match the references):
- the SAME chair in every sprite: dark navy backrest and seat, glowing cyan
  seat trim, dark metal armrests, five-star wheel base. Never redesign it
- camera: fixed, slightly high, seen from BEHIND the character
- scale: chair exactly the same size as in IMAGE 1; seated character total
  height about 1.9x the chair height (from the wheels to the top of the hair),
  chibi proportions with a big head (head about 40% of his height)
- the chair's central wheel touches the same baseline in every sprite of a row
- crisp pixel-art clusters, dark 2 px outlines, warm amber rim light from the
  upper left, faint cyan bounce light from the right, no blur, no 3D render
- chair angle rules:
  * straight, lean and talk poses: chair seen STRAIGHT FROM BEHIND, NOT rotated
  * lean poses: only the upper body tilts 5-8 degrees; hips, legs, chair stay put
  * talk poses: only head and shoulders turn toward the side; part of the face
    visible; the chair does not rotate
  * swivel poses: the ONLY ones where the chair rotates, 20-25 degrees
    (like IMAGE 2) — BOTH swivel_left AND swivel_right must visibly rotate the
    chair, mirror-opposite directions; wheel base stays in place
- both hands near keyboard height in all typing poses (straight, lean)

COMET (playful, artsy creative builder, male) — a DIFFERENT STYLE from the
other builders (they all wear tech hoodies and big headsets in blue tones).
Give him a laid-back ARTSY STREETWEAR look in WARM PURPLE / CREAM tones:
- a slouchy DARK-PURPLE KNIT BEANIE (#4B2A6B) with a small enamel comet pin;
  fluffy SILVER-LAVENDER hair (#D9D4EE with #A88FD6 shading) spilling out
  under the beanie at the back and sides. From behind, the beanie is his
  clear silhouette difference
- NO big headset: small white wireless earbuds instead
- round thin gold-frame glasses (visible only where the face shows)
- outfit: an OVERSIZED CREAM-and-PURPLE VARSITY JACKET (cream body #EFE6D2,
  purple sleeves #6A4C9C, peach-orange #FF9E6B striped cuffs and collar
  rib), with a big embroidered comet / shooting-star patch across the upper
  back; a few colourful paint splatters on one sleeve
- loose charcoal cargo trousers rolled up at the ankle, mismatched socks
  (one peach, one lavender), chunky cream skate sneakers
- talk poses: show his mischievous personality with your own choice of
  gesture and expression (wink, grin, finger-gun...)

THE 10 POSES (5 columns x 2 rows, in this order):
row 1: straight_type_a  (upright, typing, left hand slightly raised)
       straight_type_b  (same, right hand slightly raised — 2nd typing frame)
       lean_left_type_a (upper body tilted left, typing)
       lean_left_type_b (same tilt, other hand raised)
       lean_right_type_a(upper body tilted right, typing)
row 2: lean_right_type_b(same tilt, other hand raised)
       talk_left        (head and shoulders turned to the left, talking)
       talk_right       (head and shoulders turned to the right, talking)
       swivel_left      (chair + body turned 20-25 degrees to the left, relaxed)
       swivel_right     (chair + body turned 20-25 degrees to the right, relaxed)
The a/b frames of each pair must be identical except for the arms.

OUTPUT: ONE image, the sprite sheet above.
- every sprite the same size; the exact pose name as a small label under
  each sprite with clear space between sprite and label
- background: genuinely transparent. If you cannot make it transparent, use a
  FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- gaps between legs, under the seat and between arms = background too
- NO floor, cast shadow, desk, monitor, keyboard, frame or grid lines
```

Nhận sheet về: cắt vào `public/assets/comet/coding` → `node scripts/build-coding-manifest.mjs comet` → thêm `'comet'` vào `CHARACTERS`.

---

## 16. Khu REVIEW — ghế nhỏ lưng thấp + 4 reviewer

Khu review → **ghế nhỏ, lưng thấp** (tựa chỉ tới thắt lưng), không dùng ghế coding cỡ lớn.

Hướng ngồi (chốt 22/10, theo background anh đã sửa): vách sticky-note + biển REVIEW giữ sau bàn, màn hình quay **xuống-trái**; anh đã thu hẹp cảnh bên ngoài nên **lối đi phía dưới-trái bàn giờ rộng**. Reviewer ngồi ở lối đi đó → camera thấy **lưng chéo 3/4 từ sau-trái, mặt hướng lên-phải** về màn hình (giống khu coding nhìn từ sau).

Làm 2 bước: **16a** chốt ghế → **16b** gen sheet từng reviewer (đính kèm ghế đã chốt). Background đã xong (anh tự sửa, bản cũ `environment/office_original2.png`).

### 16a. Ghế review (chỉ ghế, để duyệt kiểu dáng)

Đính kèm: IMAGE 1 = `public/assets/environment/review_chair_reference.png` (góc bàn review), IMAGE 2 = `public/assets/furniture/chair_coding.png` (phong cách ghế game).

```text
Design ONE small office chair for the REVIEW area of my pixel-art office game.

ATTACHED:
- IMAGE 1: the review desk in the game. The desk runs diagonally from upper-left
  to lower-right, monitors face the lower-left. The person sits in the aisle
  on the LOWER-LEFT side of the desk, back to the camera. Keep the chair
  small and light so the area stays airy.
- IMAGE 2: the game's existing coding chair — copy its pixel-art style, outline
  thickness, materials and lighting, NOT its size or tall backrest.

THE CHAIR:
- a compact LOW-BACK task chair: the backrest is a short curved pad that would
  reach only a seated person's lower back / waist (backrest about 35% of the
  chair's total height), so the sitter's whole upper back stays visible
- small round seat, NO armrests (or very short ones), slim gas-lift column,
  small five-star wheel base
- overall footprint about 70% of the coding chair in IMAGE 2
- colours: dark navy seat and backrest, soft VIOLET trim line around the seat
  edge and the backrest (#9A64FF glow), dark metal column and base
- orientation: it belongs to someone sitting at the desk in IMAGE 1, so the
  chair FACES the upper-right of the image; we see it from behind-left, rear
  three-quarter view: the back of the backrest toward the camera, rotated so the
  seat points diagonally to the upper-right, same isometric camera as IMAGE 1

STYLE: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light from
the upper left, faint violet bounce light from the right (review neon). No blur,
no 3D render, no smooth gradients.

OUTPUT: portrait 1024x1536 PNG, chair centred, central wheel at the bottom
centre, a little empty margin. Background genuinely transparent; if you cannot,
use a FLAT SOLID MAGENTA #FF00FF background. NEVER a checkerboard.
NO person, NO desk, NO floor, NO cast shadow, NO text, NO frame, NO second chair.
```

Nhận về: lưu `public/assets/furniture/chair_review.png` (thay file cũ đã mất). Duyệt: lưng thấp tới thắt lưng, nhỏ hơn rõ ghế coding, ghế quay **lên-phải** về màn hình (camera thấy lưng ghế). IMAGE 1 có thể cắt khu review từ background mới.

### 16a-2. Pilot: 1 reviewer ngồi ghế (để căn trước khi làm cả sheet)

Ghế `chair_review.png` đã duyệt (22/10). Gen **1 sprite duy nhất** Sage ngồi gõ phím (`straight_type_a`) trên đúng ghế đó → ghép vào R1–R4 để chốt scale/anchor, rồi mới gen sheet 16b.

Đính kèm: IMAGE 1 = `public/assets/furniture/chair_review.png`, IMAGE 2 = `public/assets/environment/review-seats-pilot-zoom.png` (ghế đặt trong khu review), IMAGE 3 = `public/assets/nova/coding/straight_type_a.png` (chỉ lấy tỷ lệ người/ghế + nét vẽ).

```text
Create ONE game-ready pixel-art sprite: the reviewer SAGE sitting on the
review chair, typing, for my isometric office game. Do it in one go without
asking me anything.

ATTACHED:
- IMAGE 1: THE chair. Draw this exact chair: same model, low backrest, violet
  trim, five-star base, and the EXACT SAME ORIENTATION and camera angle. Do
  not rotate, mirror or redesign it.
- IMAGE 2: where the chair stands in the game, in front of the review desk;
  the desk and monitors are to the upper-right of the chair.
- IMAGE 3: another game character in his chair, ONLY for the size of a
  character relative to a chair, the outline thickness and the chibi
  proportions. Do not copy him.

POSE (straight_type_a):
- Sage sits on the chair of IMAGE 1, facing the same way the seat points,
  toward the desk at the upper-right; we see her from behind-left, rear
  three-quarter view: back of the head, upper back and shoulders toward the
  camera, only a sliver of cheek visible
- straight spine, shoulders level, both forearms reaching forward to an
  invisible keyboard at desk height, left hand slightly raised
- knees bent, thighs forward on the seat, feet on the floor at shoulder
  width; legs must not look straight or standing
- the LOW backrest covers only her lower back / waist; her whole upper back,
  shoulders and hair are visible above it
- the chair stays fully visible below her: seat edge, column and all five
  wheels, nothing cropped

SAGE (reviewer, female; serious, sharp-eyed):
- long DEEP-PURPLE hair (#4B2A8C with #9A64FF highlights), straight, falling
  down her back past the shoulders, blunt-cut fringe (seen only from the side)
- a small dark-violet hair bow or ribbon at the back of the head
- fitted purple-and-navy blazer-style jacket, small white collar, thin violet
  piping; slim dark trousers; dark ankle boots
- chibi proportions, big head (about 40% of her height); seated total height
  (wheels to top of hair) about 2.1x the chair height

STYLE: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light from
the upper left, soft violet bounce light from the right; same look as IMAGE 1.
No blur, no 3D render, no smooth gradients.

OUTPUT: portrait 1024x1536 PNG, sprite centred, the chair's bottom wheel at
the bottom centre with a little margin. Background genuinely transparent; if
you cannot, use a FLAT SOLID MAGENTA #FF00FF background. NEVER a checkerboard.
Gaps between legs, under the seat and between arms = background too.
NO desk, NO monitor, NO keyboard, NO floor, NO cast shadow, NO text, NO label,
NO frame, NO second chair, NO second character.
```

Nhận về: lưu `public/assets/sage/review/straight_type_a.png` → em ghép vào R1–R4 (seat thử (120,699), (209,759), (297,819), (392,882)), canh scale theo ghế trong sprite = ghế trống 70 px. Duyệt: đúng ghế + đúng hướng ghế như IMAGE 1, lưng ghế thấp thấy rõ vai, chân gập.

### 16b. Sheet reviewer (mẫu: SAGE) — ⚠ CŨ, đã thay bằng 16c

Đính kèm: IMAGE 1 = `chair_review.png` đã chốt ở 16a, IMAGE 2 = `review_chair_reference.png`, IMAGE 3 = `public/assets/nova/coding/straight_type_a.png` (chỉ lấy tỷ lệ người/ghế + nét vẽ).

Giữ **đúng 10 tên pose như khu coding** để dùng lại `slice-pose-sheet.mjs`, `build-coding-manifest.mjs` và logic hành động. Ở khu review: `talk_left` = quay sang người ngồi phía trên-trái, `talk_right` = sang người phía dưới-phải.

```text
Design the reviewer SAGE for my pixel-art office game and draw her 10
work-animation sprites as ONE sprite sheet. Do everything in one go without
asking me anything.

ATTACHED REFERENCES:
- IMAGE 1: THE chair she sits on — the small low-back review chair. Draw this
  exact chair in every sprite: same model, size, navy colour, violet trim
- IMAGE 2: the review desk; she sits in the aisle at the lower-left of this
  desk, facing the monitors (toward the upper-right of the image)
- IMAGE 3: another game character, ONLY for the size of the character relative
  to a chair, the outline thickness and the chibi proportions. Do not copy him

HARD LIMITS:
- camera: same fixed isometric camera as IMAGE 2. We see her from BEHIND-LEFT,
  rear three-quarter view: back of the head and upper back toward the camera,
  body and chair facing diagonally toward the upper-right (where the monitor
  is). Only a sliver of cheek visible in the typing poses
- the chair backrest is LOW: it covers only her lower back / waist, her whole
  upper back, shoulders and hair are visible above it
- chibi proportions, big head (about 40% of her height); seated total height
  (wheels to top of hair) about 2.1x the chair height
- seated naturally: knees bent, feet on the floor or on the chair base, hands
  forward at keyboard height (the keyboard itself is NOT drawn)
- the chair's central wheel touches the same baseline in every sprite of a row
- crisp pixel-art clusters, dark 2 px outlines, warm amber rim light from the
  upper left, soft violet bounce light from the right; no blur, no 3D render
- chair angle rules:
  * straight, lean and talk poses: chair keeps EXACTLY the orientation of
    IMAGE 1, never rotated
  * lean poses: only the upper body tilts 5-8 degrees; hips, legs, chair stay put
  * talk poses: only head and shoulders turn toward the neighbour; part of
    the face visible in profile
  * swivel poses: the ONLY ones where the chair rotates, 20-25 degrees, BOTH
    swivel_left AND swivel_right visibly rotate, mirror-opposite directions,
    wheel base stays in place

SAGE (reviewer, female; serious, sharp-eyed):
- long DEEP-PURPLE hair (#4B2A8C with #9A64FF highlights), straight, falling
  down her back past the shoulders, blunt-cut fringe (seen only from the side)
- a small dark-violet hair bow or ribbon at the back of the head
- outfit: fitted purple-and-navy blazer-style jacket, small white collar,
  thin violet piping; slim dark trousers; dark ankle boots
- accessory: a slim tablet / clipboard resting on her lap in swivel poses
- talk poses: precise, critical gesture of your choice (raised finger,
  pointing pen, eyebrow raised)

THE 10 POSES (5 columns x 2 rows, in this order):
row 1: straight_type_a  (upright, typing, left hand slightly raised)
       straight_type_b  (same, right hand slightly raised — 2nd typing frame)
       lean_left_type_a (upper body tilted left, typing)
       lean_left_type_b (same tilt, other hand raised)
       lean_right_type_a(upper body tilted right, typing)
row 2: lean_right_type_b(same tilt, other hand raised)
       talk_left        (head and shoulders turned toward the upper-left
                         neighbour, talking)
       talk_right       (head and shoulders turned toward the lower-right
                         neighbour, talking)
       swivel_left      (chair + body turned 20-25 degrees left, reading tablet)
       swivel_right     (chair + body turned 20-25 degrees right, reading tablet)
The a/b frames of each pair must be identical except for the arms.

OUTPUT: ONE image, the sprite sheet above.
- every sprite the same size; the exact pose name as a small label under
  each sprite with clear space between sprite and label
- background: genuinely transparent. If you cannot make it transparent, use a
  FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- gaps between legs, under the seat and between arms = background too
- NO floor, cast shadow, desk, monitor, keyboard, frame or grid lines
```

Reviewer khác: copy prompt trên, thay tên + đoạn mô tả nhân vật:

```text
IRIS (reviewer, female; cheerful, expressive):
- CORAL-PINK hair (#FF7A8A with #FFB3BD highlights) in a big fluffy high
  ponytail with a white scrunchie, short side strands
- outfit: pink-and-navy cropped bomber jacket with white stripes on the
  sleeves, navy pleated skirt over dark leggings, white sneakers with pink laces
- accessory: small heart-shaped pin on the back of the jacket
- talk poses: lively gesture (thumbs up, laughing, waving)
```

```text
JUNO (reviewer, female; gentle, meticulous):
- long soft LAVENDER hair (#C8B6F0 with #E8DEFF highlights), loosely braided
  into one long braid down her back, a few loose wisps
- outfit: oversized cream-white cardigan with lavender cuffs over a light blue
  top, light grey trousers, pale lavender slip-on shoes
- accessory: thin round glasses, a small light-blue hair clip
- talk poses: soft gesture (hand near chin, gentle nod, pointing at the screen)
```

```text
ECHO (reviewer, female; quiet, analytical):
- straight dark INDIGO-BLACK hair (#2A2245 with #6A4C9C highlights), chin-length
  bob with a long fringe, very neat silhouette
- a slim compact violet headset (not big over-ear cans)
- outfit: navy high-collar techwear jacket with violet seam lines and a small
  glowing violet waveform emblem on the upper back, black trousers, dark
  sneakers with violet soles
- talk poses: minimal, calm gesture (small nod, one finger raised)
```

Nhận sheet về:
`node scripts/slice-pose-sheet.mjs <sheet.png> public/assets/<ten>/review 5 2 straight_type_a straight_type_b lean_left_type_a lean_left_type_b lean_right_type_a lean_right_type_b talk_left talk_right swivel_left swivel_right`
→ manifest cho thư mục `review` (script hiện chỉ đọc `coding/`, cần thêm tham số khu) → canh theo R1–R4.

Duyệt riêng khu review: người + ghế quay **lên-phải** về màn hình (lưng về camera), lưng ghế thấp thấy rõ vai + lưng trên, ghế nhỏ hơn ghế coding.

---

### 16c. Spritesheet reviewer nữ — bản CHUẨN (thay 16b) — nhân vật đầu tiên: SAGE (thiết kế lại)

Chốt 22/10 sau pilot `characters/violet.png`:
- **Ghế xoay sang phải thêm ~10–15°** so với `chair_review.png` (giữ cố định trong mọi pose, không có pose swivel).
- Đội review **toàn nữ**, trang phục **nữ tính, thời trang**, không công sở cứng.
- Hành động **nhẹ nhàng, nữ tính** — gõ phím khẽ bằng đầu ngón tay, không gõ ầm ầm như dev.

Bộ 10 pose (5×2) và cách dùng trong game:

| # | Tên file | Hành động | Dùng cho |
|---|---|---|---|
| 1 | `type_a` | gõ khẽ bằng đầu ngón, tay trái nhấc | gõ (frame A) |
| 2 | `type_b` | như trên, tay phải nhấc | gõ (frame B) |
| 3 | `read_a` | tựa cằm vào tay trái, tay phải lăn chuột, nhìn màn hình | đọc code (frame A) |
| 4 | `read_b` | như trên, đầu nghiêng nhẹ, ngón trỏ gõ má | đọc code (frame B) |
| 5 | `note` | cầm tablet nhỏ + bút, tick checklist | ghi chú review |
| 6 | `approve` | hai tay chắp/vỗ nhẹ trước ngực, vui (LGTM) | duyệt xong |
| 7 | `talk_left` | quay đầu + vai sang trái nói chuyện | nói với người bên trái |
| 8 | `talk_right` | quay đầu + vai sang phải nói chuyện | nói với người bên phải |
| 9 | `sip_tea` | hai tay ôm cốc trà, nhấp một ngụm | nghỉ ngắn |
| 10 | `hair_tuck` | vén tóc sau tai, vẫn nhìn màn hình | động tác phụ |

- **Bắt đầu bằng SAGE, thiết kế lại ngoại hình** (22/10): **không gửi** pilot `violet.png` (tránh GPT bám ngoại hình cũ); tỷ lệ + góc nhìn mô tả bằng chữ.

Đính kèm **2 ảnh**: IMAGE 1 = `public/assets/furniture/chair_review.png`, IMAGE 2 = `public/assets/environment/review-seats-pilot-zoom.png` (ghế trống trong khu review, không có người).

```text
Design a NEW look for SAGE, a female code reviewer in my isometric
pixel-art office game, and draw her 10-pose SPRITE SHEET. Do everything in
one go without asking me anything.

ATTACHED:
- IMAGE 1: the exact review chair: low backrest, navy seat, violet trim,
  five-star wheel base. Draw this exact model, with the same outline
  thickness and lighting, in every sprite.
- IMAGE 2: the review area of the game with empty chairs; she sits on one
  of them, with the desk, keyboard and monitor in front of her to the
  upper-right.

CAMERA AND SCALE:
- same fixed isometric camera as IMAGE 2: we see her from behind-left, rear
  three-quarter view — back of the head, upper back and shoulders toward
  the camera, only a sliver of cheek visible (more face in talk poses)
- she sits ON the chair facing the desk; the LOW backrest covers only her
  lower back / waist, her shoulders and hair are fully visible above it
- seated total height (wheels to top of hair) about 2.1x the chair height

CHAIR ANGLE (same in ALL 10 sprites):
- turn the chair, together with Sage, about 10-15 degrees to the RIGHT
  compared with IMAGE 1, so she faces the desk a little more squarely
- the chair angle is IDENTICAL in every sprite; it never swivels
- the chair's bottom wheel stays at the same spot and on the same baseline
  in every sprite of a row; the chair is never cropped

SAGE — NEW DESIGN (elegant, cool and sharp-eyed; the strict but stylish
reviewer). Mostly seen from behind, so the back of her head and outfit must
be distinctive:
- hair: very long, sleek, glossy STRAIGHT DEEP-PURPLE hair (#4B2A8C with
  #9A64FF highlights) falling straight down to her waist, blunt-cut fringe;
  a thin navy velvet ribbon tied in a SMALL neat bow at the back of the head
- sharp violet eyes, thin rimless silver glasses (visible only where the
  face shows); small pearl stud earrings
- top: fitted cream turtleneck knit under a cropped DEEP-PLUM cardigan
  (#5B2A7A) with gold buttons and a tiny embroidered check-mark on the back
  of the collar
- bottom: navy-and-plum PLAID pleated midi skirt, sheer black tights
- shoes: glossy black loafers with small gold buckles
- accessory: a slim gold wristwatch on her left wrist
- her cup (sip_tea pose) is a small white porcelain teacup with a thin gold
  rim, held in both hands (no saucer)
- personality in gestures: composed and precise, a hint of a confident smile
- graceful, feminine posture: back straight, shoulders relaxed, knees
  together and slightly angled, ankles crossed or feet together on the
  chair base — never legs spread, never standing
- gentle, elegant gestures; she is a calm reviewer, NOT a hacker: no
  pounding the keyboard, no hunched shoulders
- chibi proportions, big head (about 40% of her height), same scale in every
  sprite

THE 10 POSES (5 columns x 2 rows, in this order):
row 1:
  type_a     - typing lightly with her fingertips at an invisible keyboard,
               left hand slightly raised, wrists relaxed
  type_b     - same, right hand slightly raised (2nd typing frame; identical
               to type_a except the hands)
  read_a     - reading the screen: left elbow on the desk edge, chin resting
               on her left hand, right hand on an invisible mouse
  read_b     - same as read_a, head tilted a little, left index finger
               tapping her cheek (2nd reading frame)
  note       - holding a small tablet in her left hand, ticking a checklist
               with a stylus in her right hand, looking down at it
row 2:
  approve    - happy "looks good!": hands pressed together in a light clap
               near her chest, head tilted, small smile visible at the edge
               of her cheek
  talk_left  - head and shoulders turned to HER LEFT toward a neighbour,
               part of her face visible, one hand making a small graceful
               gesture; hips, legs and chair unchanged
  talk_right - head and shoulders turned to HER RIGHT toward a neighbour,
               part of her face visible, a soft laugh with fingers near her
               mouth; hips, legs and chair unchanged
  sip_tea    - holding a small mug of tea with BOTH hands, sipping, eyes on
               the screen
  hair_tuck  - tucking a strand of hair behind her ear with her right hand,
               left hand resting on her lap, still looking at the screen

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite the same size and scale; the exact pose name as a small
  label under each sprite, with clear space between sprite and label
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- gaps between legs, under the seat and between arms = background too
- style: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light
  from the upper left, soft violet bounce light from the right; no blur,
  no 3D render, no glow halo around the sprites
- NO desk, monitor, keyboard, mouse, floor, cast shadow, frame or grid lines
  (the tablet and the tea mug are the only props)
```

Nhận sheet về:
`node scripts/slice-pose-sheet.mjs <sheet.png> public/assets/sage/review 5 2 type_a type_b read_a read_b note approve talk_left talk_right sip_tea hair_tuck`
→ manifest khu review → ghép R1–R4 (scale chốt theo ghế trong sprite = ghế trống 70 px).

Duyệt: ghế **cùng một góc** ở cả 10 hình (đã xoay phải hơn pilot); không pose nào xoay ghế; chân khép, không duỗi; cặp a/b chỉ khác tay/đầu; ngoại hình Sage mới (tóc tím đậm thẳng dài tới eo + nơ nhung nhỏ, cardigan plum ngắn trên áo cổ lọ kem, chân váy kẻ caro xếp ly midi) giống nhau ở cả 10 hình.

Reviewer tiếp theo (Iris, Juno, Echo, Violet): copy prompt, thay tên + đoạn "SAGE — NEW DESIGN …". Có thể đính thêm sheet Sage đã duyệt làm mẫu **tư thế** (ghi rõ "copy poses only, not her look").

Đoạn thiết kế VIOLET (để dành, anh đã duyệt ý tưởng 22/10):

```text
VIOLET — NEW DESIGN (sweet, stylish, a bit dreamy; the review team's
fashion girl). Mostly seen from behind, so the back of her head and outfit
must be distinctive:
- hair: long soft WAVY hair in a LILAC-to-PINK ombre (#B79CF0 at the roots
  fading to #F4B6D6 at the tips), half-up: the top section twisted into a
  small bun held by a pearl claw clip, the rest falling in loose waves down
  her back; two thin face-framing curls
- small heart-shaped earrings; NO headset (tiny white earbuds at most)
- top: oversized pastel LILAC knit sweater (#C7B3F2) with a big cream heart
  knitted on the back, slightly dropped shoulders, sleeves pushed to the
  forearms; a white collar peeking out at the neck
- bottom: white pleated tennis skirt; white knee socks with a thin lace trim
- shoes: chunky lilac-and-white platform sneakers
- accessory: a small pastel pink scrunchie on her left wrist
- her mug (sip_tea pose) is a cream mug with a little purple heart
```

---

### 16d. Reviewer thứ 2 — IRIS (cùng khung 16c, mẫu tư thế = sheet Sage)

Đính kèm **3 ảnh**: IMAGE 1 = `public/assets/furniture/chair_review.png`, IMAGE 2 = `public/assets/environment/review-seats-pilot-zoom.png`, IMAGE 3 = `public/assets/sage/review_sheet.png` (sheet Sage đã duyệt — **chỉ lấy tư thế, góc ghế, tỷ lệ**, không lấy ngoại hình).

Rút kinh nghiệm Sage: nhãn dính sát bánh xe → dặn chừa khoảng trống ≥ 40 px dưới sprite.

```text
Design IRIS, a female code reviewer in my isometric pixel-art office game,
and draw her 10-pose SPRITE SHEET. Do everything in one go without asking me
anything.

ATTACHED:
- IMAGE 1: the exact review chair: low backrest, navy seat, violet trim,
  five-star wheel base. Draw this exact model in every sprite.
- IMAGE 2: the review area of the game; she sits on one of these chairs,
  with the desk, keyboard and monitor in front of her to the upper-right.
- IMAGE 3: the APPROVED sprite sheet of another reviewer, Sage. Copy from it
  EXACTLY: the 10 poses and their order, the chair angle, the camera angle
  (rear three-quarter view from behind-left), the size of the character
  relative to the chair, the sprite size on the sheet, outline thickness and
  lighting. Do NOT copy Sage's hair, face or clothes — Iris looks completely
  different (see below).

HARD LIMITS:
- the chair angle is IDENTICAL to IMAGE 3 in all 10 sprites; it never swivels
- the chair's bottom wheel stays on the same baseline in every sprite of a
  row; the chair is never cropped
- seated, knees together and slightly angled, feet together or ankles
  crossed — never legs spread, never standing
- gentle, girly gestures; she is a reviewer, NOT a hacker: no pounding the
  keyboard
- chibi proportions, big head (about 40% of her height), same scale as Sage

IRIS — NEW DESIGN (cheerful, bubbly, expressive; the team's mood-maker).
Mostly seen from behind, so the back of her head and outfit must be
distinctive and clearly different from Sage's long straight purple hair:
- hair: CORAL-PINK hair (#FF7A8A with #FFB3BD highlights) in a big fluffy
  HIGH PONYTAIL that bounces above the backrest, tied with a large white
  ribbon scrunchie; short wispy side strands; two small heart hair clips
- bright pink eyes, rosy cheeks (visible where the face shows)
- top: cropped PINK varsity-style cardigan (#F58AA8) with white ribbed cuffs
  and hem, a small white star patch on the back, over a white frilly-collar
  top
- bottom: NAVY pleated mini skirt (#2B3A67) with a thin white stripe near the
  hem; white ankle socks with tiny pink bows
- shoes: white platform sneakers with pink laces
- accessory: a small pink heart charm phone strap dangling from her pocket
- her cup (sip_tea pose): a pink boba tea cup with a big straw
- personality in gestures: lively, sparkly, cute

THE 10 POSES (same order and meaning as IMAGE 3, 5 columns x 2 rows):
row 1:
  type_a     - typing lightly with her fingertips, left hand slightly raised
  type_b     - same, right hand slightly raised (identical except the hands)
  read_a     - reading the screen, chin resting on her left hand, right hand
               on an invisible mouse
  read_b     - same as read_a, head tilted, left finger tapping her cheek
  note       - holding a small pink tablet, ticking a checklist with a stylus
row 2:
  approve    - happy "looks good!": both small fists raised near her cheeks,
               ponytail bouncing, a big smile at the edge of her cheek
  talk_left  - head and shoulders turned to HER LEFT, part of her face
               visible, a cheerful little wave; hips, legs, chair unchanged
  talk_right - head and shoulders turned to HER RIGHT, part of her face
               visible, laughing with a hand near her mouth; hips, legs,
               chair unchanged
  sip_tea    - holding the boba cup with BOTH hands, sipping from the straw,
               eyes on the screen
  hair_tuck  - twirling the end of her ponytail with her right hand, left
               hand on her lap, still looking at the screen

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite the same size and scale; the exact pose name as a small
  label under each sprite
- leave AT LEAST 40 px of empty background between the lowest wheel of each
  sprite and its label — the label must never touch the sprite
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- gaps between legs, under the seat and between arms = background too
- style: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light
  from the upper left, soft violet bounce light from the right; no blur, no
  3D render, no glow halo around the sprites
- NO desk, monitor, keyboard, mouse, floor, cast shadow, frame or grid lines
  (the tablet and the boba cup are the only props)
```

Nhận sheet về: lưu `public/assets/iris/review_sheet.png` →
`node scripts/slice-pose-sheet.mjs public/assets/iris/review_sheet.png public/assets/iris/review 5 2 type_a type_b read_a read_b note approve talk_left talk_right sip_tea hair_tuck`
→ `node scripts/build-coding-manifest.mjs iris 139 0.023 review` → thêm `'iris'` vào `REVIEWERS` trong `src/coding-test.ts`.

Duyệt: góc ghế giống Sage; tóc đuôi ngựa hồng cam khác hẳn Sage khi nhìn từ sau; nhãn không dính bánh xe.

---

### 16e. Reviewer thứ 3 — JUNO (cùng khung 16d, mẫu tư thế = sheet Sage)

Đính kèm **3 ảnh** như Iris: IMAGE 1 = `public/assets/furniture/chair_review.png`, IMAGE 2 = `public/assets/environment/review-seats-pilot-zoom.png`, IMAGE 3 = `public/assets/sage/review_sheet.png`.

Phân biệt khi nhìn từ sau: Sage = tóc tím thẳng dài, Iris = đuôi ngựa cao hồng cam → **Juno = hai bím tóc dài màu bạc-lavender + mũ beret kem**, tông xanh trời/trắng.

```text
Design JUNO, a female code reviewer in my isometric pixel-art office game,
and draw her 10-pose SPRITE SHEET. Do everything in one go without asking me
anything.

ATTACHED:
- IMAGE 1: the exact review chair: low backrest, navy seat, violet trim,
  five-star wheel base. Draw this exact model in every sprite.
- IMAGE 2: the review area of the game; she sits on one of these chairs,
  with the desk, keyboard and monitor in front of her to the upper-right.
- IMAGE 3: the APPROVED sprite sheet of another reviewer, Sage. Copy from it
  EXACTLY: the 10 poses and their order, the chair angle, the chair SIZE, the
  camera angle (rear three-quarter view from behind-left), the size of the
  character relative to the chair, the sprite size on the sheet, outline
  thickness and lighting. Do NOT copy Sage's hair, face or clothes — Juno
  looks completely different (see below).

HARD LIMITS:
- the chair angle and size are IDENTICAL to IMAGE 3 in all 10 sprites; it
  never swivels
- the chair's bottom wheel stays on the same baseline in every sprite of a
  row; the chair is never cropped
- seated, knees together and slightly angled, feet together or ankles
  crossed — never legs spread, never standing
- gentle, careful gestures; she is a reviewer, NOT a hacker: no pounding the
  keyboard
- chibi proportions, big head (about 40% of her height), same scale as Sage

JUNO — NEW DESIGN (gentle, soft-spoken, meticulous; the dreamy bookworm of
the team). Mostly seen from behind, so the back of her head and outfit must
be distinctive and clearly different from a long straight purple hairstyle
and from a high pink ponytail:
- hair: pale SILVER-LAVENDER hair (#D8CCF2 with #A996D9 shading) in TWO long
  loose BRAIDS hanging down her back over the backrest, each tied with a
  small sky-blue ribbon; soft wispy fringe
- a slouchy CREAM BERET (#F1E6D0) tilted on the back of her head
- round thin gold glasses, gentle blue-violet eyes (visible where the face
  shows)
- outfit: a SKY-BLUE pinafore dress (#8EC5EE) over a white blouse with puff
  sleeves and a round lace collar; the pinafore straps cross on her back and
  meet in a small white bow
- white frilly ankle socks, light-brown mary-jane shoes
- accessory: a tiny bookmark-shaped charm on a ribbon around her wrist
- her cup (sip_tea pose): a clear glass of iced matcha latte with a paper
  straw
- personality in gestures: calm, careful, a little shy

THE 10 POSES (same order and meaning as IMAGE 3, 5 columns x 2 rows):
row 1:
  type_a     - typing softly with her fingertips, left hand slightly raised
  type_b     - same, right hand slightly raised (identical except the hands)
  read_a     - reading the screen closely, chin resting on her left hand,
               right hand on an invisible mouse
  read_b     - same as read_a, head tilted, left finger touching her lips,
               thinking
  note       - holding a small sky-blue tablet close, carefully ticking a
               checklist with a stylus
row 2:
  approve    - quietly happy "looks good!": hands clasped together near her
               chest, a soft shy smile at the edge of her cheek
  talk_left  - head and shoulders turned to HER LEFT, part of her face
               visible, one hand politely raised as she explains; hips,
               legs, chair unchanged
  talk_right - head and shoulders turned to HER RIGHT, part of her face
               visible, a gentle giggle behind her fingers; hips, legs,
               chair unchanged
  sip_tea    - holding the iced matcha glass with BOTH hands, sipping from
               the straw, eyes on the screen
  hair_tuck  - pushing her round glasses up with her right index finger,
               left hand resting on her lap, still looking at the screen

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite the same size and scale; the exact pose name as a small
  label under each sprite
- leave AT LEAST 40 px of empty background between the lowest wheel of each
  sprite and its label — the label must never touch the sprite
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- gaps between legs, under the seat and between arms = background too
- style: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light
  from the upper left, soft violet bounce light from the right; no blur, no
  3D render, no glow halo around the sprites
- NO desk, monitor, keyboard, mouse, floor, cast shadow, frame or grid lines
  (the tablet and the glass are the only props)
```

Nhận sheet về: lưu `public/assets/juno/review_sheet.png` → `node scripts/slice-pose-sheet.mjs public/assets/juno/review_sheet.png public/assets/juno/review 5 2 type_a type_b read_a read_b note approve talk_left talk_right sip_tea hair_tuck` → kiểm tra nhãn từng ảnh → manifest **theo cỡ ghế** (đế ≈ 74 px) → thêm `'juno'` vào `REVIEWERS`.

Pose `hair_tuck` của Juno = **đẩy kính** (giữ tên file để dùng chung code).

---

### 16f. Reviewer thứ 4 — ECHO (cùng khung 16e, mẫu tư thế = sheet Sage)

Đính kèm **3 ảnh** như Juno: IMAGE 1 = `public/assets/furniture/chair_review.png`, IMAGE 2 = `public/assets/environment/review-seats-pilot-zoom.png`, IMAGE 3 = `public/assets/sage/review_sheet.png`.

Phân biệt khi nhìn từ sau: Sage = tóc tím thẳng dài, Iris = đuôi ngựa hồng cam, Juno = hai bím bạc-lavender + beret → **Echo = tóc bob ngắn đen ngang cằm, lớp trong nhuộm mint + headphone trắng**, tông **đen/xám than + xanh mint** (đổi 22/10: bản tím trùng tông Sage), phong cách techwear nữ tính.

```text
Design ECHO, a female code reviewer in my isometric pixel-art office game,
and draw her 10-pose SPRITE SHEET. Do everything in one go without asking me
anything.

ATTACHED:
- IMAGE 1: the exact review chair: low backrest, navy seat, violet trim,
  five-star wheel base. Draw this exact model in every sprite.
- IMAGE 2: the review area of the game; she sits on one of these chairs,
  with the desk, keyboard and monitor in front of her to the upper-right.
- IMAGE 3: the APPROVED sprite sheet of another reviewer, Sage. Copy from it
  EXACTLY: the 10 poses and their order, the chair angle, the chair SIZE, the
  camera angle (rear three-quarter view from behind-left), the size of the
  character relative to the chair, the sprite size on the sheet, outline
  thickness and lighting. Do NOT copy Sage's hair, face or clothes — Echo
  looks completely different (see below).

HARD LIMITS:
- the chair angle and size are IDENTICAL to IMAGE 3 in all 10 sprites; it
  never swivels
- the chair's bottom wheel stays on the same baseline in every sprite of a
  row; the chair is never cropped
- seated, knees together and slightly angled, feet together or ankles
  crossed — never legs spread, never standing
- calm, minimal gestures; she is a reviewer, NOT a hacker: no pounding the
  keyboard
- chibi proportions, big head (about 40% of her height), same scale as Sage

ECHO — NEW DESIGN (quiet, cool, analytical; the team's silent bug-hunter,
stylish in a soft techwear way). Mostly seen from behind, so the back of her
head and outfit must be distinctive and clearly different from long straight
hair, a high ponytail or two braids:
- NO purple or violet anywhere on her (another reviewer already owns that
  colour); her palette is BLACK / CHARCOAL / WHITE + MINT GREEN (#5FE3B8)
- hair: a sleek CHIN-LENGTH BOB of glossy BLACK hair (#1E1E24 with cool grey
  highlights) with a hidden MINT-GREEN underlayer that shows at the back and
  the tips; slightly longer at the front, long straight fringe; the short
  bob leaves the back of her neck visible
- a small WHITE wireless headphone band over her head with mint glowing ear
  cups (compact, not big gaming cans)
- calm grey-green eyes, a tiny silver star stud earring
- top: an oversized CHARCOAL-GREY cropped hoodie-jacket (#3A3D45) with a
  high collar, thin mint seam lines and a small glowing mint sound-wave logo
  on the back; sleeves slightly long, covering half her hands
- bottom: white pleated mini skirt with a thin mint hem stripe, black
  thigh-high socks
- shoes: chunky white sneakers with mint soles and black laces
- accessory: a small mint keychain charm shaped like a bug clipped to her
  skirt
- her cup (sip_tea pose): a white thermos tumbler with a mint lid
- personality in gestures: quiet, precise, a faint smile

THE 10 POSES (same order and meaning as IMAGE 3, 5 columns x 2 rows):
row 1:
  type_a     - typing softly with her fingertips, left hand slightly raised
  type_b     - same, right hand slightly raised (identical except the hands)
  read_a     - reading the screen, chin resting on her left hand, right hand
               on an invisible mouse
  read_b     - same as read_a, head tilted, left finger tapping her
               headphone ear cup, focused
  note       - holding a small white tablet with a mint case, ticking a checklist with a
               stylus
row 2:
  approve    - calm "looks good!": a small thumbs-up near her shoulder, a
               faint satisfied smile at the edge of her cheek
  talk_left  - head and shoulders turned to HER LEFT, part of her face
               visible, one finger raised as she points something out;
               hips, legs, chair unchanged
  talk_right - head and shoulders turned to HER RIGHT, part of her face
               visible, a small amused smile behind her sleeve; hips, legs,
               chair unchanged
  sip_tea    - holding the thermos tumbler with BOTH hands, sipping, eyes on
               the screen
  hair_tuck  - adjusting her headphone band with her right hand, left hand
               resting on her lap, still looking at the screen

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite the same size and scale; the exact pose name as a small
  label under each sprite
- leave AT LEAST 40 px of empty background between the lowest wheel of each
  sprite and its label — the label must never touch the sprite
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- gaps between legs, under the seat and between arms = background too
- style: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light
  from the upper left, soft violet bounce light from the right; no blur, no
  3D render, no glow halo around the sprites
- NO desk, monitor, keyboard, mouse, floor, cast shadow, frame or grid lines
  (the tablet and the tumbler are the only props)
```

Nhận sheet về: lưu `public/assets/echo/review_sheet.png` → `node scripts/slice-pose-sheet.mjs public/assets/echo/review_sheet.png public/assets/echo/review 5 2 type_a type_b read_a read_b note approve talk_left talk_right sip_tea hair_tuck` → kiểm tra nhãn từng ảnh → manifest **theo cỡ ghế** (đế ≈ 74 px) → thêm `'echo'` vào `REVIEWERS`.

Pose `hair_tuck` của Echo = **chỉnh headphone** (giữ tên file để dùng chung code).

---

## 17. FX khu REVIEW — sheet icon pixel-art (TUỲ CHỌN, thay emoji)

Hiện 4 hiệu ứng review (glyph bay lên, Bug Hunt, con dấu APPROVED, approval wave) đã chạy bằng code + emoji (`src/coding-test.ts`, `ReviewSeat.updateFx`). Emoji mỗi hệ điều hành vẽ một kiểu, không cùng nét pixel → nếu muốn đồng bộ thì gen sheet này rồi thay. Không đính kèm ảnh nhân vật; đính kèm `public/assets/environment/review-team-zoom.png` (chỉ để lấy phong cách + bảng màu).

```text
Create ONE pixel-art sprite sheet of small game FX icons for the REVIEW zone
of my isometric office game (cute, feminine, neon-violet office at night).
Do it in one go without asking me anything.

ATTACHED: IMAGE 1 shows the game (only for pixel style, outline and palette).

8 ICONS, 4 columns x 2 rows, each icon centred in its own equal cell, in
this order:
row 1:
  lens         - a magnifying glass, white rim, pale-blue glass with a small
                 shine, short handle pointing to the lower-right
  bug          - a small cute green bug (round body, 6 tiny legs, 2
                 antennae), seen from above-front, slightly worried face
  bug_squashed - the same bug flattened into a flat green splat with two
                 "x" eyes and tiny stars around it
  sparkle      - a 4-point star sparkle, white core with a soft gold edge
row 2:
  heart        - a small pixel heart, violet (#B98CFF) with a white shine
  check        - a bold rounded check mark, mint green (#5FE3B8)
  cross        - a bold rounded "x" mark, coral red (#FF5A6E)
  stamp        - a rectangular rubber-stamp badge reading exactly
                 "APPROVED", mint green (#5FE3B8) border and letters on a
                 dark navy fill, slightly worn ink texture, rotated about
                 -12 degrees

RULES:
- crisp pixel-art, dark 1-2 px outlines, flat shading with one highlight,
  readable at a very small size (each icon will be shown 12-24 px tall)
- every icon the same visual size inside its cell (the stamp may be wider),
  generous empty space around each icon
- the exact icon name as a small label UNDER each cell, at least 40 px below
  the icon so the label never touches it
- background: genuinely transparent; if you cannot, use a FLAT SOLID MAGENTA
  #FF00FF background. NEVER draw a checkerboard
- NO glow halo, NO drop shadow, NO frame or grid lines, NO extra text except
  the word APPROVED on the stamp and the labels
```

Nhận về: lưu `public/assets/fx/review_fx_sheet.png` → `node scripts/slice-pose-sheet.mjs public/assets/fx/review_fx_sheet.png public/assets/fx/review 4 2 lens bug bug_squashed sparkle heart check cross stamp` → `node scripts/drop-label.mjs public/assets/fx/review/*.png` (nếu nhãn dính) → báo em để thay emoji/Graphics bằng sprite (giữ nearest hoặc mipmap tuỳ cỡ).

---

## 18. Khu MERGE — EVE ĐỨNG làm việc (quản lý, không ghế)

Chốt 22/10: **Eve chỉ đứng, không ngồi, không ghế** → thể hiện rõ vai người quản lý/điều phối. Đứng trên thảm xanh trước bàn Merge, **cùng góc nhìn khu review**: lưng chéo 3/4 về camera, mặt hướng lên-phải về màn hình/hologram. Không có ghế trống ở Merge.

Đính kèm **3 ảnh**: IMAGE 1 = `public/assets/environment/merge_area_reference.png` (trạm Merge, phóng 2×), IMAGE 2 = `public/assets/sage/review_sheet.png` (chỉ lấy **góc camera + nét vẽ + cỡ đầu/tỷ lệ chibi**), IMAGE 3 = `public/assets/environment/review-team-zoom.png` (cỡ nhân vật trong game).

```text
Design EVE, the MERGE LEAD (team manager) of my isometric pixel-art office
game, STANDING at the MERGE station, and draw her 10-pose SPRITE SHEET. Do
everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the MERGE station (L-shaped desk, glowing blue monitors and a
  hologram globe, blue floor mat). She STANDS on the mat in front of the
  desk; the keyboard, monitors and hologram are in front of her to the
  upper-right.
- IMAGE 2: an approved sprite sheet of a SEATED character. Copy ONLY the
  camera angle (rear three-quarter view from behind-left, facing the
  upper-right), the outline thickness, lighting and the chibi head size. Do
  NOT copy her look, her chair or her seated pose.
- IMAGE 3: how characters look in the game, for scale and style only.

HARD LIMITS:
- Eve is STANDING in every sprite: NO chair, NO stool, never sitting
- rear three-quarter view from behind-left, body facing the upper-right
  (toward the desk and hologram); back of the head, back and shoulders toward
  the camera, part of the face visible only in talk and approve poses
- standing upright with confident, manager-like posture: straight back,
  shoulders open, weight on one leg; feet slightly apart
- her feet stand on the same baseline in every sprite of a row; never
  cropped
- chibi proportions, big head (about 40% of her height); her standing height
  (soles to top of hair) about 1.15x the height of one seated sprite of
  IMAGE 2 (chair included)

EVE — the brightest star of the studio (confident, warm, decisive; she
merges everyone's work and leads the team). Seen mostly from behind, so the
back of her head and outfit must be distinctive:
- hair: shiny LAVENDER hair with an iridescent CYAN sheen (#C9B6FF to
  #7FE9FF), styled in TWO round buns high on the head with long soft tails
  falling from each bun down her back; a few glowing cyan hair pins
- a small holographic earpiece on one ear projecting a thin cyan light ring
  (subtle, small)
- bright cyan eyes, confident smile (visible where the face shows)
- outfit: a smart cropped WHITE tech blazer with violet and cyan panel lines
  and a glowing "merge" symbol on the back (two branch lines joining into
  one arrow), over a violet top; a pleated cyan-to-violet gradient skirt;
  white knee boots with cyan light strips
- a slim white tablet she carries in some poses

THE 10 POSES (5 columns x 2 rows, in this order):
row 1:
  type_a     - standing, leaning slightly toward the desk, typing on an
               invisible keyboard at desk height, left hand raised
  type_b     - same, right hand raised (identical except the hands)
  read_a     - standing, one hand on her hip, the other hand's fingers at her
               chin, reviewing the screen
  read_b     - same as read_a, head tilted, index finger tapping her chin
  note       - right arm extended, swiping a small floating cyan hologram
               panel in the air (the only hologram in the sheet)
row 2:
  approve    - "merged!": a confident fist pump at shoulder height, buns
               bouncing, big smile at the edge of her cheek
  talk_left  - head and shoulders turned to HER LEFT, part of her face
               visible, pointing ahead with an open hand, giving directions;
               feet unchanged
  talk_right - head and shoulders turned to HER RIGHT, part of her face
               visible, a warm laugh with a hand near her mouth; feet
               unchanged
  sip_tea    - holding a sleek white cup with a cyan sleeve in one hand,
               sipping, the tablet tucked under the other arm
  hair_tuck  - arms crossed, standing tall and watching the screens,
               the overseeing manager pose

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite the same size and scale; the exact pose name as a small
  label under each sprite
- leave AT LEAST 40 px of empty background between her feet and the label
  — the label must never touch the sprite
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO glow halo or light pool under her, NO floor, NO cast shadow
- gaps between legs and between arms and body = background too
- style: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light
  from the upper left, cool cyan bounce light from the right (the merge
  station glow); no blur, no 3D render
- NO desk, monitor, keyboard, mouse, chair, frame or grid lines (the tablet,
  the small hologram panel in "note" and the cup are the only props)
```

Nhận sheet về: lưu `public/assets/eve/merge_sheet.png` → `node scripts/slice-pose-sheet.mjs public/assets/eve/merge_sheet.png public/assets/eve/merge 5 2 type_a type_b read_a read_b note approve talk_left talk_right sip_tea hair_tuck` → kiểm tra nhãn (`drop-label.mjs` hiện dò theo bánh xe ghế — với sprite đứng cần kiểm tra tay, chân không bị cắt) → (sheet không alpha) `clean-fringe.mjs 2` → manifest khu `merge`, anchor = **giữa hai bàn chân**. Vị trí đứng: trên thảm trước bàn phím chính (bàn phím ~ (1290, 420)), canh khi ghép.

Pose `hair_tuck` của Eve = **khoanh tay giám sát**; `read_*` = tay chống hông xem màn hình (giữ tên file dùng chung code).

---

## 19. Hào quang FX (TUỲ CHỌN — thay bản vẽ bằng code)

Hiện đã chạy bằng code (`ReviewSeat.updateAura`): **Eve ⚡ Merge Rush** = hào quang điện cyan + kim cương xoay + tia sét; **reviewer 🔍 Bug Hunt** = hào quang mềm theo màu riêng + sao nhỏ xoay. Nếu muốn nét pixel-art đẹp như `fx/fire_aura.png` thì gen 2 ảnh dưới (cùng cách dùng fire: 1 ảnh, code làm nhấp nháy/xê dịch/scale). Lưu vào `public/assets/fx/`.

### 19a. `fx/merge_aura.png` — Eve (đứng)

Đính kèm: `public/assets/eve/merge/type_a.png` (lấy kích thước bóng người).

```text
Create ONE pixel-art ELECTRIC HOLOGRAM AURA effect sprite for a game, sized to
surround the STANDING character in the attached image (same canvas size and
proportions, same bottom-centre anchor between her feet).

THE EFFECT:
- a tall glowing aura hugging her silhouette from feet to above the head,
  CYAN (#7FE9FF) to soft VIOLET (#B98CFF), brightest at the outline and
  fading outward
- crackling thin white-cyan lightning arcs on both sides of the body
- small floating diamond-shaped data particles and tiny hexagons drifting
  upward around her
- a faint glowing ring on the floor around her feet (thin ellipse, no shadow)

RULES:
- the CHARACTER ITSELF MUST NOT BE DRAWN: the area where her body is stays
  fully transparent (the aura is drawn behind and around her)
- crisp pixel-art clusters, no blur, no smooth gradient banding, no 3D render
- transparent PNG background. If you cannot, use a FLAT SOLID MAGENTA #FF00FF
  background. NEVER a checkerboard
- NO text, NO frame, NO floor tiles, NO cast shadow
```

### 19b. `fx/focus_aura.png` — reviewer (ngồi ghế review), tô màu bằng code

Đính kèm: `public/assets/sage/review/type_a.png` (lấy kích thước người + ghế).

```text
Create ONE pixel-art soft FOCUS AURA effect sprite for a game, sized to
surround the SEATED character and her chair in the attached image (same
canvas size and proportions, same bottom-centre anchor at the chair's bottom
wheel).

THE EFFECT (draw it in WHITE and light grey only — the game tints it with
each character's colour):
- a gentle rounded glow around her upper body and head, brightest near the
  outline, fading softly outward; calm and elegant, not fiery
- small 4-point sparkles and tiny stars floating slowly upward around her
  head and shoulders
- a few thin curved light streaks circling her like a halo ring

RULES:
- the CHARACTER AND CHAIR MUST NOT BE DRAWN: their area stays fully
  transparent (the aura is drawn behind and around them)
- crisp pixel-art clusters, no blur, no 3D render
- transparent PNG background. If you cannot, use a FLAT SOLID MAGENTA #FF00FF
  background. NEVER a checkerboard
- NO text, NO frame, NO floor, NO cast shadow
```

Nhận về: báo em để thay `updateAura` bằng sprite (anchor/scale theo sprite nhân vật đính kèm; `focus_aura` tô `tint` theo `REVIEW_COLORS`).

---

## 20. Khu PLAN — THEO, planner nam (ĐỨNG ở bàn kế hoạch, thay "Captain")

Chốt 22/10: bỏ tên Captain → nhân vật **nam, phong cách planner**, tên tạm **Theo**. Bàn PLAN là bàn gỗ dài chạy chéo trước bảng sticky-note → Theo **đứng** trên thảm trước bàn (bàn kế hoạch đứng, trải giấy tờ), **cùng góc nhìn Review/Merge**: lưng chéo 3/4 về camera, mặt hướng lên-phải. Không ghế. Cùng quy trình cắt/căn như Eve (anchor giữa hai bàn chân).

Đính kèm **3 ảnh**: IMAGE 1 = `public/assets/environment/plan_area_reference.png` (khu PLAN, phóng 2×), IMAGE 2 = `public/assets/eve/merge_sheet.png` (sheet nhân vật ĐỨNG đã duyệt — chỉ lấy **góc camera, tư thế đứng, cỡ đầu/tỷ lệ chibi, nét vẽ**), IMAGE 3 = `public/assets/environment/review-team-zoom.png` (cỡ nhân vật trong game).

```text
Design THEO, the PLANNER of my isometric pixel-art office game (male), STANDING
at the PLAN table, and draw his 10-pose SPRITE SHEET. Do everything in one go
without asking me anything.

ATTACHED:
- IMAGE 1: the PLAN area (a long wooden planning table covered with papers,
  in front of a whiteboard full of sticky notes, a rug on the floor). He
  STANDS on the rug in front of the table; the table, papers and board are in
  front of him to the upper-right.
- IMAGE 2: an approved sprite sheet of a STANDING character. Copy from it
  EXACTLY: the camera angle (rear three-quarter view from behind-left, facing
  the upper-right), the standing height and chibi proportions, the sprite
  size on the sheet, outline thickness and lighting. Do NOT copy her look.
- IMAGE 3: how characters look in the game, for scale and style only.

HARD LIMITS:
- Theo is STANDING in every sprite: NO chair, never sitting
- rear three-quarter view from behind-left, body facing the upper-right
  (toward the table and board); back of the head, back and shoulders toward
  the camera, part of the face visible only in talk and approve poses
- calm, organised, upright posture; feet slightly apart, on the same
  baseline in every sprite of a row; never cropped
- chibi proportions, big head (about 40% of his height), same standing
  height as the character in IMAGE 2

THEO — the planner (male; calm, thoughtful, tidy, quietly witty; he turns
ideas into roadmaps). WARM AMBER / CREAM / BROWN palette, clearly different
from the blue-hoodie coders. Seen mostly from behind, so the back of his head
and outfit must be distinctive:
- hair: neat, soft CHESTNUT-BROWN hair (#7A4A2A with warm amber highlights),
  short at the back with a tidy side part and a slightly wavy fringe
- a yellow pencil tucked behind his right ear; thin round tortoiseshell
  glasses (visible where the face shows), warm amber eyes
- outfit: a CREAM cable-knit sweater vest over a light-blue shirt with the
  sleeves rolled to the elbows; a thin brown leather strap of a shoulder
  satchel crossing his back diagonally; dark olive chinos; brown leather
  shoes
- accessory: a clipboard with sticky notes, and a few colourful sticky notes
  stuck on his satchel strap
- his cup (sip_tea pose): a warm amber coffee mug

THE 10 POSES (5 columns x 2 rows, in this order):
row 1:
  type_a     - leaning slightly over the table, writing on a paper with a
               pen, left hand holding the paper, pen hand up
  type_b     - same, pen hand down (2nd writing frame; identical except the
               hands)
  read_a     - standing straight, holding the clipboard in his left hand at
               chest height, reading it
  read_b     - same as read_a, flipping a page with his right hand
  note       - reaching his right arm up and forward, sticking a yellow
               sticky note on the board ahead
row 2:
  approve    - "plan locked!": a satisfied thumbs-up near his shoulder,
               small smile at the edge of his cheek
  talk_left  - head and shoulders turned to HIS LEFT, part of his face
               visible, explaining with the pen raised like a pointer;
               feet unchanged
  talk_right - head and shoulders turned to HIS RIGHT, part of his face
               visible, a friendly laugh, clipboard under his arm; feet
               unchanged
  sip_tea    - holding the amber coffee mug in one hand, sipping, the
               clipboard tucked under the other arm
  hair_tuck  - thinking: one hand on his chin, the other taking the pencil
               from behind his ear

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite the same size and scale; the exact pose name as a small
  label under each sprite
- leave AT LEAST 40 px of empty background between his feet and the label
  — the label must never touch the sprite
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO glow halo or light pool under him, NO floor, NO cast shadow
- gaps between legs and between arms and body = background too
- style: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light
  from the upper left, soft warm bounce light from the desk lamp on the
  right; no blur, no 3D render
- NO table, board, monitor, chair, frame or grid lines (the clipboard, pen,
  pencil, sticky note and mug are the only props)
```

Nhận sheet về: lưu `public/assets/theo/plan_sheet.png` → `node scripts/slice-pose-sheet.mjs public/assets/theo/plan_sheet.png public/assets/theo/plan 5 2 type_a type_b read_a read_b note approve talk_left talk_right sip_tea hair_tuck` → bỏ nhãn kiểu sprite đứng (cắt ở hàng hẹp dưới chân, chỉ ảnh còn nhãn) → (nếu không alpha) `clean-fringe.mjs 2` → manifest khu `plan` cao ~146 px như Eve. Chỗ đứng ước lượng trên thảm trước giữa bàn ≈ (787, 317) — canh khi ghép.

`type_a/b` của Theo = viết lên giấy; `hair_tuck` = suy nghĩ, rút bút chì sau tai (giữ tên file dùng chung code).

---

## 21. Khu RELAX — PIXEL, designer làm việc MỘT MÌNH trên sofa

Chốt 22/10: **khu Relax là chỗ làm việc riêng của Pixel** (designer, một mình) — không còn là chỗ idle chung. Pixel ngồi trên sofa chữ L, đoạn trái (mặt ngồi quay **xuống-phải về camera**) → **thấy mặt, chính diện chéo 3/4**. Sprite **không vẽ sofa**. Seat ước lượng ≈ (1190, 785), canh khi ghép.

Đính kèm **3 ảnh**: IMAGE 1 = `public/assets/environment/relax_area_reference.png`, IMAGE 2 = `public/assets/environment/review-team-zoom.png` (cỡ nhân vật), IMAGE 3 = `public/assets/sage/review_sheet.png` (chỉ lấy nét vẽ, cỡ đầu chibi, ánh sáng).

```text
Design PIXEL, the DESIGNER of my isometric pixel-art office game (female),
WORKING alone on the lounge sofa — her own creative corner — and draw her
10-pose SPRITE SHEET. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the RELAX lounge: a big orange leather L-shaped sofa with
  cushions, a coffee table, warm floor lamps. She sits on the LEFT section
  of the sofa, whose seat faces the LOWER-RIGHT (toward the camera).
- IMAGE 2: how characters look in the game, for scale and style only.
- IMAGE 3: an approved sprite sheet of another character. Copy ONLY the
  outline thickness, lighting, chibi head size and overall character size.
  Do NOT copy her look, chair or camera angle.

HARD LIMITS:
- she SITS on a sofa that is NOT drawn: draw only the character, seated
  with her hips at seat height, one leg crossed or both knees up with feet
  on the sofa edge in some poses, otherwise feet on the floor. NO sofa, NO
  cushion, NO chair, NO table
- camera: fixed isometric, FRONT three-quarter view: her body faces the
  LOWER-RIGHT, so we see her face, chest and knees; slightly from above
- her hips stay at the same spot in every sprite of a row; never cropped
- chibi proportions, big head (about 40% of her height); seated size like
  the seated characters in IMAGE 3 (without their chair)
- she is WORKING, focused and creative, in a cosy laid-back way

PIXEL — the studio's UI / art designer (female; creative, stylish, playful,
a bit dreamy). A real DESIGNER look — artsy, trendy, colourful accents —
with a palette different from the other girls (purple, coral pink,
lavender/sky-blue, black/mint, holographic violet):
- hair: short fluffy ICE-BLUE wolf-cut (#BFE8FF) with a hidden PASTEL PINK
  inner layer (#FFB8D9), soft bangs, a stylus / pencil stuck in her hair
- big round clear-frame glasses, bright pink eyes, a tiny paint smudge on
  one cheek
- big white CAT-EAR headphones around her neck
- outfit: an oversized LEMON-YELLOW knit cardigan (#FFE066) slipping off
  one shoulder, over a white crop tee with an RGB colour-wheel print; wide
  light-denim pants with a few colourful paint splatters, rolled at the
  ankle; white platform sneakers with rainbow laces
- accessories: a colour-swatch fan charm on her belt loop, colourful
  stickers on her laptop
- props: a white drawing tablet with stylus, a slim pastel laptop covered
  in stickers, a fan of colour swatches

THE 10 POSES (5 columns x 2 rows, in this order):
row 1:
  sketch_a   - drawing on the tablet resting on her crossed knee, stylus
               touching it, concentrating, tongue slightly out (work frame A)
  sketch_b   - same, stylus lifted to make a new stroke (work frame B;
               identical except the stylus hand)
  laptop_a   - the sticker laptop open on her lap, typing / moving the
               trackpad, focused (work frame A)
  laptop_b   - same, one hand pushing her glasses up, still looking at the
               screen (work frame B)
  swatch     - holding the colour-swatch fan up next to the tablet,
               comparing colours, one eye squinting
row 2:
  approve    - "design done!": proudly holding the tablet up and turned
               toward the camera with a big smile, a little sparkle in her
               eyes (the tablet shows a colourful UI mock-up)
  think      - stylus tapping her chin, looking up, imagining ideas
  talk       - turned slightly to HER LEFT, chatting, holding the stylus
               like a pointer
  sip_tea    - holding a big mug of hot cocoa with both hands, steam
               rising, eyes happily closed
  stretch    - both arms stretched up above her head, a big yawn, tablet
               resting on her lap

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite the same size and scale; the exact pose name as a small
  label under each sprite
- leave AT LEAST 40 px of empty background between her lowest point and the
  label — the label must never touch the sprite
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO sofa, NO furniture, NO floor, NO cast shadow, NO glow halo
- gaps between legs and between arms and body = background too
- style: crisp pixel-art clusters, dark 2 px outlines, warm amber light from
  the floor lamps (upper left and right), a faint cool glow from her screens
  on her face; no blur, no 3D render
- NO text other than the labels (tablet, laptop, swatches, mug are the only
  props)
```

Nhận sheet về: lưu `public/assets/pixel/relax_sheet.png` → `node scripts/slice-pose-sheet.mjs public/assets/pixel/relax_sheet.png public/assets/pixel/relax 5 2 sketch_a sketch_b laptop_a laptop_b swatch approve think talk sip_tea stretch` → bỏ nhãn (dò hàng hẹp dưới chân, chỉ ảnh còn nhãn) → (nếu không alpha) `clean-fringe.mjs 2` → manifest khu `relax` (pose chuẩn `sketch_a` — cần thêm vào `build-coding-manifest.mjs`), anchor = giữa mông trên mặt sofa (đo khi ghép).

Ghép vào game: dùng bộ hành động kiểu review với tên pose riêng: gõ/vẽ = sketch_a/b + laptop_a/b, đọc = swatch/think, approve = khoe bản thiết kế (con dấu **DESIGNED**), đỉnh FX riêng sẽ đề xuất sau (vd "🎨 Color Burst").

---

## 22. Khu PLAN — ORACLE, QA nữ ĐỨNG cạnh Theo, QUAY MẶT về người xem

Chốt 22/10: Oracle (spec-validator, gộp spec-init/spec-publish) là **nữ**, đứng ở khu Plan **cạnh Theo**, **quay mặt về phía người xem** (= nhìn xuống khu Coding phía dưới), cầm giấy/clipboard check và **mắng dev**. Không ghế. Chỗ đứng ước lượng trên thảm bên phải Theo ≈ (850, 345) — canh khi ghép. Theo ở bên trái màn hình của cô (= bên PHẢI của cô vì cô quay mặt ra).

Đính kèm **3 ảnh**: IMAGE 1 = `public/assets/environment/plan-theo-fx.png` (khu Plan có Theo đứng — lấy chỗ đứng + cỡ), IMAGE 2 = `public/assets/eve/merge_sheet.png` (nhân vật ĐỨNG đã duyệt — chỉ lấy **chiều cao đứng, tỷ lệ chibi, nét vẽ**), IMAGE 3 = `public/assets/pixel/relax_sheet.png` (nhân vật nhìn **chính diện** đã duyệt — chỉ lấy cách vẽ mặt nhìn thẳng).

```text
Design ORACLE, the strict QA / spec validator of my isometric pixel-art office
game (female), STANDING in the PLAN area and FACING THE VIEWER, and draw her
10-pose SPRITE SHEET. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the PLAN area with the planner Theo standing at the table. Oracle
  stands on the same rug, a little to the right of Theo, but she turns her
  back to the table and FACES THE VIEWER — she is watching the coding team
  below her and checking their work.
- IMAGE 2: an approved sheet of a STANDING character: copy her standing
  height, chibi proportions, outline thickness and lighting. Do NOT copy her
  look or her camera angle (she is seen from behind; Oracle is seen from the
  front).
- IMAGE 3: an approved sheet of a FRONT-facing character: copy how the face
  and front of the body are drawn at this camera. Do NOT copy her look.

HARD LIMITS:
- Oracle is STANDING in every sprite: NO chair, never sitting
- camera: fixed isometric, FRONT three-quarter view: her body faces the
  LOWER-LEFT toward the viewer; we clearly see her face, chest and the paper
  she holds; slightly from above
- her feet stand on the same baseline in every sprite of a row; never cropped
- chibi proportions, big head (about 40% of her height), same standing
  height as the character in IMAGE 2

ORACLE — the QA inspector (female; strict, sharp, perfectionist, secretly
caring; she checks every spec and scolds the devs when they break the rules,
in a funny-tsundere way, never mean). Her palette must differ from the other
girls (purple, coral pink, lavender/sky-blue, black/mint, holographic violet,
ice-blue/yellow): DEEP NAVY + WHITE with sharp RED accents:
- hair: long, sleek DEEP-NAVY hair (#1F2A55 with cool blue highlights) in a
  tight HIGH PONYTAIL, straight blunt fringe, one strand framing her face
- sharp rectangular red-frame glasses, cool icy-blue eyes, a small frown
  line when angry
- outfit: a tailored NAVY cropped blazer with a red piping and a red
  check-mark badge on the chest, over a crisp white shirt with a thin red
  ribbon tie; a navy high-waist pleated skirt; black tights; glossy black
  ankle boots
- props: a white clipboard with a checklist (rows of boxes, some ticked,
  some crossed in red) and a RED pen; a lanyard ID card "QA"
- her cup (sip_tea pose): a black coffee mug with a red check mark

THE 10 POSES (5 columns x 2 rows, in this order):
row 1:
  check_a    - holding the clipboard at chest height, ticking a box with the
               red pen, focused (work frame A)
  check_b    - same, pen lifted, eyes moving to the next line (work frame B;
               identical except the pen hand and eyes)
  glare_a    - looking up from the clipboard straight at the viewer (the
               devs), pushing her glasses up with one finger, a cold stare
  glare_b    - same, eyes narrowed, the glasses glinting
  scold      - SCOLDING the devs: leaning forward, pointing the red pen at
               the viewer, mouth wide open shouting, an angry vein mark,
               clipboard raised in the other hand
row 2:
  approve    - a rare approval: a small proud smile, eyes closed, holding
               up the clipboard with a big red check mark, a tiny blush
  talk       - turned slightly to HER RIGHT (toward Theo), discussing the
               checklist, pen tapping the clipboard
  sigh       - facepalm: one hand on her forehead, clipboard hanging down,
               an exasperated sigh
  sip_tea    - sipping from the black coffee mug, clipboard tucked under her
               arm, eyes still watching the viewer suspiciously
  hair_tuck  - arms crossed with the clipboard against her chest, tapping
               one foot impatiently

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite the same size and scale; the exact pose name as a small
  label under each sprite
- leave AT LEAST 40 px of empty background between her feet and the label
  — the label must never touch the sprite
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO table, board, furniture, floor, cast shadow, glow halo, frame or grid
  lines
- gaps between legs and between arms and body = background too
- style: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light
  from the upper left, soft cool light from the right; no blur, no 3D render
- NO text except the "QA" on her ID card, the pose labels and the marks on
  the checklist (the clipboard, pen, ID card and mug are the only props;
  speech bubbles / anger marks other than the small vein are added by the
  game)
```

Nhận sheet về: lưu `public/assets/oracle/plan_sheet.png` → `node scripts/slice-pose-sheet.mjs public/assets/oracle/plan_sheet.png public/assets/oracle/plan 5 2 check_a check_b glare_a glare_b scold approve talk sigh sip_tea hair_tuck` → bỏ nhãn (thử "hàng hẹp < 40" trước, nếu nhãn dính giày dùng cách "khối nhãn độ rộng không đổi") → (nếu không alpha) `clean-fringe.mjs 2` → manifest khu `plan` riêng thư mục `oracle/plan` (pose chuẩn khu plan = `type_a` → cần cho `build-coding-manifest.mjs` nhận pose chuẩn `check_a` khi không có `type_a`) → alias pose: type→check_a/b, read→glare_a/b, note→scold, hair_tuck→hair_tuck, talk_left/right→talk.

Đỉnh FX dự kiến của Oracle: **📢 Code Review Roast** — cô hét, bóng thoại "!!" + "FIX IT!" bay về phía khu Coding, các builder giật mình (rung + "💦"), dấu ✗ đỏ bay khỏi màn hình dev rồi chuyển ✓ → approve con dấu **VALIDATED**.

---

## 23. Khu REVIEW — SHERLOCK, error-analyzer nam, ĐỨNG sau đội reviewer, QUAY MẶT ra

Chốt 22/10: Sherlock được giữ lại (tạo riêng, không gộp nữa). **Đứng sau lưng đội reviewer** (phía dưới-trái hàng ghế review, trên sàn trống giữa hàng ghế và lan can), **quay mặt về phía người xem**, trầm ngâm **ghi log bug**. Không ghế. Chỗ đứng ước lượng ≈ (195, 825) — canh khi ghép.

Đính kèm **3 ảnh**: IMAGE 1 = `public/assets/environment/review-team-zoom.png` (đội review đang ngồi — anh ta đứng phía sau họ, gần người xem), IMAGE 2 = `public/assets/oracle/plan_sheet.png` (nhân vật ĐỨNG, QUAY MẶT ra đã duyệt — chép **góc camera, chiều cao đứng, tỷ lệ chibi, nét vẽ**, không chép ngoại hình), IMAGE 3 = `public/assets/theo/plan_sheet.png` (nhân vật nam đã duyệt — tham khảo dáng nam chibi).

```text
Design SHERLOCK, the bug detective / error analyst of my isometric pixel-art
office game (male), STANDING behind the review team and FACING THE VIEWER,
and draw his 10-pose SPRITE SHEET. Do everything in one go without asking
me anything.

ATTACHED:
- IMAGE 1: the review team sitting at their desk, backs to the camera. He
  stands on the floor BEHIND them (closer to the viewer), watching their
  screens over their shoulders and logging the bugs they find — but his body
  and face are turned toward the viewer.
- IMAGE 2: an approved sheet of a STANDING, FRONT-facing character: copy her
  camera angle (front three-quarter view, body facing the LOWER-LEFT toward
  the viewer), standing height, chibi proportions, outline thickness and
  lighting. Do NOT copy her look.
- IMAGE 3: an approved male character, for a male chibi build only. Do NOT
  copy his look or camera angle.

HARD LIMITS:
- Sherlock is STANDING in every sprite: NO chair, never sitting
- camera: fixed isometric, FRONT three-quarter view, facing the LOWER-LEFT
  toward the viewer; we clearly see his face and the notebook; slightly
  from above
- his feet stand on the same baseline in every sprite of a row; never
  cropped
- chibi proportions, big head (about 40% of his height), same standing
  height as the character in IMAGE 2

SHERLOCK — the bug detective (male; calm, brooding, sharp-eyed, a little
dramatic; he hunts the root cause of every error). Palette: CHARCOAL BLACK +
BURNT ORANGE / RED-ORANGE accents, clearly different from everyone else:
- hair: spiky, tousled RED-ORANGE hair (#E8562A with #FF9A4D highlights),
  one strand falling over his forehead; sharp amber eyes, slightly
  half-lidded when thinking
- a small charcoal tweed DEERSTALKER detective cap tilted on his head
- outfit: a long CHARCOAL detective trench coat (to the knees) with burnt-
  orange lining and a red-orange warning-stripe band on one sleeve, collar
  up, over a black turtleneck; dark grey trousers; brown leather boots
- props: a small worn notebook labelled with a bug doodle on the cover, a
  pen, and a brass MAGNIFYING GLASS hanging from his belt
- his cup (sip_tea pose): a white paper coffee cup with an orange sleeve

THE 10 POSES (5 columns x 2 rows, in this order):
row 1:
  log_a      - holding the open notebook, writing a bug log with the pen,
               eyes on the page, calm (work frame A)
  log_b      - same, pen lifted, glancing up thoughtfully (work frame B;
               identical except the pen hand and eyes)
  ponder_a   - brooding: one hand holding his chin, notebook under his arm,
               eyes narrowed, deep in thought
  ponder_b   - same, head tilted the other way, a finger tapping his chin
  inspect    - holding the magnifying glass up to his eye, one big
               magnified amber eye visible through the lens
row 2:
  approve    - "case closed": snapping the notebook shut with a confident
               smirk, eyes closed
  talk       - turned slightly to HIS LEFT (toward the reviewers), pointing
               at something with the pen, explaining a clue
  eureka     - "AHA!": index finger raised high, eyes wide, a sudden
               realization
  sip_tea    - sipping the paper coffee cup, notebook tucked under his arm,
               still thinking
  hair_tuck  - adjusting the brim of his deerstalker cap with two fingers,
               a mysterious look

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite the same size and scale; the exact pose name as a small
  label under each sprite
- leave AT LEAST 40 px of empty background between his feet and the label
  — the label must never touch the sprite
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO desk, chair, monitor, floor, cast shadow, glow halo, frame or grid lines
- gaps between legs and between arms and body = background too
- style: crisp pixel-art clusters, dark 2 px outlines, warm amber rim light
  from the upper left, soft violet bounce light from the review monitors on
  the right; no blur, no 3D render
- NO text except the pose labels (notebook, pen, magnifying glass and cup
  are the only props; speech bubbles are added by the game)
```

Nhận sheet về: lưu `public/assets/sherlock/review_sheet.png` → `node scripts/slice-pose-sheet.mjs public/assets/sherlock/review_sheet.png public/assets/sherlock/review 5 2 log_a log_b ponder_a ponder_b inspect approve talk eureka sip_tea hair_tuck` → bỏ nhãn (khung nhãn dính bốt: tỷ lệ phủ hàng + despeck như Oracle) → (nếu không alpha) `clean-fringe.mjs 2` → manifest `node scripts/build-coding-manifest.mjs sherlock <h> 0.023 review log_a.png` (cao ~ Oracle 138) → alias: type→log_a/b, read→ponder_a/b, note→inspect, talk_*→talk, hair_tuck→hair_tuck.

Đỉnh FX dự kiến: **🧵 Root Cause** — các con bọ đỏ nhỏ bay lên từ màn hình 4 reviewer, nối với nhau bằng sợi chỉ đỏ kiểu bảng điều tra, hội tụ về một điểm trên đầu Sherlock → bùng "AHA!" (pose eureka) → bọ biến thành ✓ → con dấu **ROOT CAUSE**/**SOLVED**.


### 23b. Gen lại 2 pose Sherlock bị lẫn tóc Oracle (`approve`, `talk`)

Đính kèm: `public/assets/sherlock/review_sheet.png` (sheet đã duyệt).

```text
Edit the attached sprite sheet of SHERLOCK. Two sprites are wrong: "approve"
and "talk" (row 2, columns 1 and 2) show a long dark-navy ponytail behind his
head that does NOT belong to him — it was copied from another character.

Redraw ONLY these two poses as a 2-column x 1-row sheet:
  approve - "case closed": snapping the notebook shut with a confident smirk,
            eyes closed
  talk    - turned slightly to HIS LEFT, pointing at something with the pen,
            explaining a clue
Keep EXACTLY the same character as the other 8 sprites: short spiky
red-orange hair under the deerstalker cap (NO long hair, NO ponytail), the
same coat, boots, scale, camera angle, outline and lighting.

OUTPUT: 2 sprites side by side, same size as in the sheet, pose name as a
small label under each with AT LEAST 40 px of empty space between the boots
and the label; genuinely transparent background (or flat magenta #FF00FF);
NO checkerboard, NO floor, NO shadow.
```

Nhận về: cắt 2×1 vào `public/assets/sherlock/review/` (approve, talk), bỏ nhãn, chạy lại manifest, xoá `approve:'eureka'` và `talk_*:'log_b'` khỏi alias `SHERLOCK_STATION`.
---

## 24. IDLE — sheet idle mẫu cho PIXEL (6×2 = 12 pose)

Chốt 22/10: idle ở Cafe + Relax, không đi bộ, đổi chỗ bằng fade. **Ghế cafe (C1–C4) BAKE vào sprite** (người + đúng ghế gỗ đó, cùng góc) để đè khít lên ghế trong background và lưng ghế che đúng người. Sofa/pouf/ghế đôi KHÔNG vẽ ghế. C5 có 2 pose: **đứng pha cà phê quay lưng** + **đứng uống cà phê quay mặt ra**.

Hướng ghế cafe (soi lại background): **C2, C4 quay mặt ra người xem ↙**; **C1, C3 quay lưng, nhìn về bàn ↗**. Sofa trái/pouf: chính diện ↘ (sofa phải ↙ = lật ngang). Ghế đôi R7: quay lưng ↖.

Đính kèm **4 ảnh**: IMAGE 1 = `public/assets/environment/cafe_chair_reference.png` (trái: ghế C2 nhìn từ trước-↙; phải: ghế C1 nhìn từ sau-↗), IMAGE 2 = `public/assets/environment/cafe_area_reference.png`, IMAGE 3 = `public/assets/environment/relax_area_reference.png`, IMAGE 4 = `public/assets/pixel/relax_sheet.png` (Pixel đã duyệt — giữ y hệt ngoại hình, nét vẽ, tỷ lệ).

```text
Draw a 12-pose IDLE sprite sheet of PIXEL, the designer of my isometric
pixel-art office game, relaxing on her break in the CAFE and the LOUNGE.
Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the two cafe chairs of the game, zoomed in. LEFT = the chair seen
  from the FRONT, its seat facing the LOWER-LEFT toward the viewer, backrest
  behind. RIGHT = the chair seen from BEHIND, its seat facing the UPPER-RIGHT
  toward the table, backrest toward the viewer. Same dark-brown wooden frame
  with a woven rattan backrest.
- IMAGE 2: the cafe (tables, chairs, coffee counter).
- IMAGE 3: the lounge (orange L-sofa, poufs, small loveseat).
- IMAGE 4: Pixel's APPROVED sprite sheet. Keep her EXACTLY the same: face,
  ice-blue wolf-cut hair with pink inner layer, glasses, cat-ear headphones,
  yellow cardigan, colour-wheel crop tee, wide paint-splattered jeans, white
  platform sneakers; same outline thickness, lighting and chibi scale.

TWO KINDS OF SITTING POSES:
- CAFE CHAIR poses (chair_*): draw Pixel sitting ON the exact cafe chair of
  IMAGE 1, chair included in the sprite, same angle and same chair-to-body
  proportion (the chair seat at her hip height, the chair height about 40%
  of the whole sprite height). The backrest must correctly overlap her body
  where it is nearer to the viewer.
- LOUNGE poses (sit_*): she sits on a sofa/pouf that is NOT drawn: draw only
  her, hips at seat height, knees forward, feet on the floor. NO sofa, NO
  cushion, NO chair.

THE 12 POSES (6 columns x 2 rows, in this order):
row 1 — lounge, NO chair:
  sit_relax  - FRONT view, body facing the LOWER-RIGHT, leaning back,
               hands on her lap, content smile
  sit_drink  - same facing, holding a big mug of hot cocoa with both hands,
               steam, eyes happily closed
  sit_phone  - same facing, legs crossed, scrolling her phone, amused
  sit_laugh  - same facing, laughing with eyes closed, hand near her mouth
  sit_doze   - same facing, dozing off, head tilted, headphones on, hands
               loose (peaceful sleepy face; the game adds "Zzz")
  sit_back   - BACK view, she faces the UPPER-LEFT (back of her head toward
               the viewer), sitting relaxed, one arm on the (undrawn) armrest
row 2 — cafe chair (chair INCLUDED) and standing at the coffee counter:
  chair_front_drink - on the FRONT chair (IMAGE 1 left), facing the
               LOWER-LEFT toward the viewer, sipping a latte cup
  chair_front_talk  - same chair and angle, chatting, one hand waving
  chair_back_drink  - on the BACK chair (IMAGE 1 right), facing the
               UPPER-RIGHT toward the table, back to the viewer, holding a
               cup up to her mouth
  chair_back_talk   - same chair and angle, head turned slightly to the
               left in profile, chatting
  stand_brew - STANDING, back to the viewer, facing the UPPER-LEFT, both
               hands working an (undrawn) espresso machine at counter height
  stand_drink- STANDING, FRONT view facing the LOWER-RIGHT toward the
               viewer, drinking a takeaway coffee cup, relaxed

OUTPUT: ONE image, the sprite sheet above (landscape 1536x1024).
- every sprite at the same scale (Pixel's head the same size in all 12);
  the exact pose name as a small label under each sprite
- leave AT LEAST 40 px of empty background between the lowest point of each
  sprite (feet or chair legs) and its label — the label must never touch it
- background: genuinely transparent. If you cannot make it transparent, use
  a FLAT SOLID MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO table, sofa, counter, machine, floor, cast shadow or glow halo (the
  cafe chairs in chair_* poses are the only furniture)
- gaps between legs, chair legs, arms and body = background too
- crisp pixel-art clusters, dark 2 px outlines, warm amber cafe lighting;
  no blur, no 3D render; no text except the labels
```

Nhận sheet về: lưu `public/assets/pixel/idle_sheet.png` → cắt 6×2 vào `public/assets/pixel/idle/` (sit_relax, sit_drink, sit_phone, sit_laugh, sit_doze, sit_back, chair_front_drink, chair_front_talk, chair_back_drink, chair_back_talk, stand_brew, stand_drink) → bỏ nhãn → manifest khu `idle` (chuẩn theo đầu ≈ cỡ Pixel đang làm việc; pose chair_* canh thêm cho ghế trong sprite trùng ghế background). Ghép slot: C1/C3 = chair_back_*, C2/C4 = chair_front_*, C5 = stand_brew/stand_drink, C6 = stand_brew, R1/R2/R5/R6 = sit_*, R3 = sit_* lật ngang, R7 = sit_back, R8 = stand_drink lật ngang (tạm).

---

### 24a. IDLE — NOVA (builder đầu tiên, cùng khung 24, mẫu tư thế = sheet idle Pixel)

Làm từng nhân vật một, Nova trước (anh chốt 22/10). Khung tư thế lấy từ **sheet idle Pixel đã duyệt** để 12 pose cùng góc, cùng ghế, cùng thứ tự → code chỉ đổi thư mục. Nova chưa từng có ảnh chính diện → lấy mặt từ `swivel_left.png` (thấy nghiêng mặt: mắt xanh, cười).

Ghế cafe sau khi xếp lại (22/10): `chair_back_*` dùng ở C1, C3 và C2 (lật ngang); `chair_front_*` chỉ dùng ở C4 — vẫn cần đủ 12 pose.

Đính kèm **6 ảnh** theo đúng thứ tự:
1. `public/assets/pixel/idle_sheet.png` — mẫu tư thế/bố cục
2. `public/assets/environment/cafe_chair_reference.png`
3. `public/assets/environment/cafe_area_reference.png`
4. `public/assets/environment/relax_area_reference.png`
5. `public/assets/nova/coding/straight_type_a.png` — Nova nhìn từ sau (tóc, tai nghe, áo)
6. `public/assets/nova/coding/swivel_left.png` — Nova thấy mặt nghiêng

```text
Draw a 12-pose IDLE sprite sheet of NOVA, a builder (male coder) of my
isometric pixel-art office game, relaxing on his break in the CAFE and the
LOUNGE. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the APPROVED idle sheet of another character (Pixel). It is the
  POSE TEMPLATE: copy its layout (6 columns x 2 rows), the pose order, every
  body angle, the cafe chairs (same chair, same angle, same chair-to-body
  size) and the sprite scale EXACTLY. Only the character changes.
- IMAGE 2: the two cafe chairs, zoomed. LEFT = seen from the FRONT, seat
  facing the LOWER-LEFT toward the viewer. RIGHT = seen from BEHIND, seat
  facing the UPPER-RIGHT toward the table, backrest toward the viewer.
- IMAGES 3-4: the cafe and the lounge of the game, for lighting and scale.
- IMAGES 5-6: NOVA, approved. Image 5 from behind, image 6 turning his head
  so his face shows. Keep him EXACTLY: tall spiky cobalt-blue hair, big blue
  eyes, cheerful open smile, black-and-cyan gaming headset with a small
  microphone, navy hooded tech jacket with bright cyan stripes and a cyan
  square patch on the sleeve, black jogger trousers, navy-and-cyan sneakers
  with white soles; same chibi proportions (big head), same thick dark
  outline, same colours. He is energetic and boyish.

HIS ACCESSORIES ON BREAK (instead of Pixel's): an energy-drink can with a
cyan lightning logo (sit_drink), a big black coffee mug with a cyan "{ }"
print (chair_*_drink), a handheld game console instead of a phone
(sit_phone), a takeaway coffee cup (stand_drink). Headset pushed down around
his neck in the relaxed poses, ON his head in sit_doze.

THE 12 POSES (same order and angles as IMAGE 1):
row 1 — lounge, NO furniture drawn:
  sit_relax  - FRONT view facing the LOWER-RIGHT, leaning back, arms
               stretched behind his head, relaxed grin
  sit_drink  - same facing, gulping the energy-drink can, eyes closed
  sit_phone  - same facing, legs crossed, playing the handheld console,
               tongue out in focus
  sit_laugh  - same facing, laughing hard, eyes closed, fist on his knee
  sit_doze   - same facing, dozing off, head tilted, mouth slightly open,
               arms loose (peaceful; the game adds "Zzz")
  sit_back   - BACK view facing the UPPER-LEFT, back of his spiky head to
               the viewer, one arm resting on the (undrawn) armrest
row 2 — cafe chair (chair INCLUDED, copy IMAGE 1) and standing:
  chair_front_drink - FRONT chair, facing the LOWER-LEFT, sipping the mug
  chair_front_talk  - same chair and angle, chatting, one hand gesturing
  chair_back_drink  - BACK chair, facing the UPPER-RIGHT toward the table,
               back to the viewer, mug raised to his mouth
  chair_back_talk   - same chair and angle, head turned to the left in
               profile, chatting
  stand_brew - STANDING, back to the viewer, facing the UPPER-LEFT, both
               hands working an (undrawn) espresso machine
  stand_drink- STANDING, FRONT view facing the LOWER-RIGHT, drinking the
               takeaway cup, other hand in his jacket pocket

OUTPUT: ONE image, landscape 1536x1024, the 12 sprites on a 6x2 grid.
- every sprite at the same scale (Nova's head the same size in all 12, and
  the same head size as Pixel's in IMAGE 1); his tall spiky hair must stay
  fully inside the sprite cell
- the exact pose name as a small label under each sprite, with AT LEAST
  40 px of empty background between the lowest point of the sprite (feet or
  chair legs) and the label; leave a clear empty band between the 2 rows
- background: genuinely transparent. If you cannot, use a FLAT SOLID
  MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO table, sofa, counter, machine, floor, cast shadow or glow halo (the
  cafe chairs in chair_* poses are the only furniture)
- gaps between legs, chair legs, arms and body = background too
- crisp pixel-art clusters, dark outlines, warm amber cafe lighting;
  no blur, no 3D render; no text except the labels
```

Nhận sheet về: lưu **`public/assets/nova/idle_sheet.png`** (PNG; nếu là webp/jpg thì cứ lưu, em đổi định dạng) → báo em cắt vào `public/assets/nova/idle/` → manifest khu `idle` (đầu Nova ≈ đầu Pixel idle, ghế trong sprite ≈ ghế Pixel) → ghép thử trên các slot → nối vào trang test (bấm Nova ở ghế coding → nghỉ).

---

### 24b. IDLE — ORION (mẫu tư thế = sheet idle NOVA đã duyệt)

Nova đã chạy tốt (22/10) → từ Orion dùng **sheet idle Nova** làm khung (cùng dáng nam, cùng cỡ ghế). Mặt Orion lấy từ `talk_left.png` (thấy nghiêng mặt). Tính cách điềm tĩnh → đồ riêng nhẹ nhàng: chai cold brew, tách sứ trắng viền vàng, điện thoại giải cờ vua (giữ hiệu ứng ngôi sao/"WIN!" của `sit_phone`), cốc giấy mang đi.

**Rút gọn còn 3 ảnh (22/10, anh hỏi):** sheet Nova đã có sẵn đúng ghế cafe, đúng góc, đúng cỡ, đúng ánh sáng → bỏ 3 ảnh tham chiếu ghế/khu cafe/khu relax. Đính kèm theo đúng thứ tự:
1. `public/assets/nova/idle_sheet.png` — mẫu tư thế + ghế + cỡ
2. `public/assets/orion/coding/straight_type_a.png` — Orion nhìn từ sau
3. `public/assets/orion/coding/talk_left.png` — Orion thấy mặt nghiêng

```text
Draw a 12-pose IDLE sprite sheet of ORION, a builder (male coder) of my
isometric pixel-art office game, relaxing on his break in the CAFE and the
LOUNGE. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the APPROVED idle sheet of another builder (Nova). It is the
  TEMPLATE: copy its layout (6 columns x 2 rows), the pose order, the
  facing direction of every pose, the wooden cafe chairs (same chair, same
  angle, same chair-to-body size), the sprite scale and the warm lighting
  EXACTLY. Only the character, his gestures, expressions and props change.
  Do NOT copy anything of Nova's look (no spiky blue hair, no cyan jacket).
  In chair_front_* the chair seat faces the LOWER-LEFT toward the viewer;
  in chair_back_* the chair is seen from behind, seat facing the
  UPPER-RIGHT toward the table, backrest toward the viewer.
- IMAGES 2-3: ORION, approved. Image 2 from behind, image 3 turning his
  head so his face shows. Keep him EXACTLY: neat NAVY-BLACK hair with
  dark-blue highlights, smooth layered strands, a long SIDE-SWEPT FRINGE
  falling to the right, short and tidy at the nape (NO tall spikes - his
  silhouette must clearly differ from Nova's); calm deep-blue eyes, small
  relaxed smile; matte BLACK over-ear headset with thin GOLD rings and a
  gold-tipped microphone; DARK NAVY hooded tech jacket, hood down, with gold
  zip pull, thin gold trim on shoulders and cuffs, small gold geometric
  badge on the upper back; dark charcoal trousers; dark navy sneakers with
  white soles and a thin gold stripe. Same chibi proportions (big head),
  same thick dark outline, same colours. He is calm, quiet and focused.

HIS ACCESSORIES ON BREAK (instead of Nova's): a glass bottle of cold-brew
coffee (sit_drink), a white porcelain cup with a thin gold rim on a saucer
(chair_*_drink), his phone showing a chess puzzle (sit_phone), a takeaway
coffee cup (stand_drink). Headset resting around his neck in the relaxed
poses, ON his head in sit_doze.

THE 12 POSES (same order and angles as IMAGE 1, calmer body language):
row 1 — lounge, NO furniture drawn:
  sit_relax  - FRONT view facing the LOWER-RIGHT, leaning back, one ankle
               on the other knee, hands folded on his stomach, eyes half
               closed, peaceful smile
  sit_drink  - same facing, sipping the cold-brew bottle, eyes closed
  sit_phone  - same facing, legs crossed, studying the chess puzzle on his
               phone, chin on his fist, thoughtful
  sit_laugh  - same facing, laughing softly with eyes closed, hand covering
               his mouth (quiet laugh, not loud)
  sit_doze   - same facing, dozing off, head tilted, arms crossed loosely
               (peaceful; the game adds "Zzz")
  sit_back   - BACK view facing the UPPER-LEFT, back of his head to the
               viewer, one arm resting on the (undrawn) armrest
row 2 — cafe chair (chair INCLUDED, copy IMAGE 1) and standing:
  chair_front_drink - FRONT chair, facing the LOWER-LEFT, sipping from the
               porcelain cup, saucer in the other hand
  chair_front_talk  - same chair and angle, chatting calmly, one open hand
  chair_back_drink  - BACK chair, facing the UPPER-RIGHT toward the table,
               back to the viewer, cup raised to his mouth
  chair_back_talk   - same chair and angle, head turned to the left in
               profile, chatting
  stand_brew - STANDING, back to the viewer, facing the UPPER-LEFT, both
               hands working an (undrawn) espresso machine
  stand_drink- STANDING, FRONT view facing the LOWER-RIGHT, drinking the
               takeaway cup, other hand in his trouser pocket

OUTPUT: ONE image, landscape 1536x1024, the 12 sprites on a 6x2 grid.
- every sprite at the same scale (Orion's head the same size in all 12, and
  the same head size as Nova's in IMAGE 1); his hair must stay fully inside
  the sprite cell
- the exact pose name as a small label under each sprite, with AT LEAST
  40 px of empty background between the lowest point of the sprite (feet or
  chair legs) and the label; leave a clear empty band between the 2 rows
- background: genuinely transparent. If you cannot, use a FLAT SOLID
  MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO table, sofa, counter, machine, floor, cast shadow or glow halo (the
  cafe chairs in chair_* poses are the only furniture)
- gaps between legs, chair legs, arms and body = background too
- crisp pixel-art clusters, dark outlines, warm amber cafe lighting;
  no blur, no 3D render; no text except the labels
```

Nhận sheet về: lưu **`public/assets/orion/idle_sheet.png`** → em cắt vào `public/assets/orion/idle/` → manifest cùng cỡ Nova/Pixel → thêm `orion` vào `IDLERS`.

### 24c. IDLE các nhân vật còn lại — 3 ảnh + động tác theo TÍNH CÁCH

Quy tắc (anh chốt 22/10): **giữ cố định** 12 tên pose, hướng mặt từng pose, ghế cafe trong `chair_*`, cỡ sprite (code + toạ độ slot phụ thuộc mấy cái này). **Được đổi theo tính cách:** cử chỉ tay, dáng ngồi (bắt chéo chân, co gối, ngả lưng…), nét mặt, đồ cầm tay.

Đính kèm 3 ảnh: (1) sheet mẫu — **nam dùng `nova/idle_sheet.png`, nữ dùng `pixel/idle_sheet.png`**; (2) ảnh nhân vật nhìn từ sau / đang làm việc; (3) ảnh thấy mặt. Prompt = khối 24b, thay tên + đoạn mô tả ngoại hình + đoạn ACCESSORIES + 12 dòng pose theo bảng dưới.

| Nhân vật | Mẫu | Ảnh 2 · ảnh 3 | Tính cách → đồ cầm | Điểm nhấn động tác |
|---|---|---|---|---|
| **Orion** ✅ prompt 24b | Nova | `orion/coding/straight_type_a` · `talk_left` | điềm tĩnh: chai cold brew, tách sứ viền vàng, cờ vua trên điện thoại | ngồi gác chân, tay đan bụng, cười che miệng khẽ, ngủ khoanh tay |
| **Lyra** (nữ) | Pixel | `lyra/coding/straight_type_a` · `talk_left` | bình tĩnh, chăm chỉ: trà sữa, sổ tay + bút, tai nghe nghe podcast | đọc sổ ghi chú, gối ôm, ngủ gục lên sổ |
| **Vega** | Nova | `vega/coding/straight_type_a` · `talk_left` | trẻ, nhanh nhẹn: chai nước thể thao, điện thoại game tốc độ | ngồi nhún chân, duỗi vai, cười giơ ngón cái, ngủ ngả đầu ra sau |
| **Atlas** | Nova | `atlas/coding/straight_type_a` · `talk_left` | thân thiện, thực tế: hộp cơm/bánh mì, cốc trà nóng to | mời bánh, cười vỗ đùi, ngủ khoanh tay ngáy |
| **Comet** | Nova | `comet/coding/straight_type_a` · `talk_left` | tinh nghịch, sáng tạo: soda có ống hút xoắn, sổ vẽ nguệch ngoạc | vẽ bậy lên sổ, làm mặt hề khi cười, ngủ tư thế lộn xộn |
| **Sage** | Pixel | `sage/review/type_a` · `talk_left` | nghiêm túc, sắc sảo: tách trà sứ trắng, sách bìa cứng | ngồi thẳng lưng, đọc sách, cười mỉm kín đáo, ngủ ngồi thẳng gật nhẹ |
| **Iris** | Pixel | `iris/review/type_a` · `talk_left` | vui vẻ, biểu cảm: trà sữa trân châu, điện thoại selfie | tạo dáng chữ V, cười ôm bụng, ngủ ôm gối tim |
| **Juno** | Pixel | `juno/review/type_a` · `talk_left` | dịu dàng, tỉ mỉ: matcha đá, đan len / sổ dán sticker | đẩy kính, ngồi khép gối, cười che miệng, ngủ tựa má lên tay |
| **Echo** | Pixel | `echo/review/type_a` · `talk_left` | trầm lặng, phân tích: bình giữ nhiệt mint, headphone nghe nhạc | nhắm mắt nghe nhạc gật gù, khoanh tay, cười nửa miệng, ngủ trùm mũ hoodie |
| **Eve** | Pixel | `eve/merge/type_a` · `talk_left` | trung tâm, nổi bật: cà phê đá cao, tablet hologram | ngồi bắt chéo chân kiểu "boss", vươn vai, cười tươi, ngủ đeo kính râm lên đầu |
| **Theo** | Nova | `theo/plan/type_a` · `talk_left` | planner: cà phê amber, clipboard + bút chì | viết kế hoạch kỳ nghỉ, chống cằm nghĩ, cười hiền, ngủ úp clipboard lên mặt |
| **Oracle** | Pixel | `oracle/plan/check_a` · `talk` | QA tsundere: cà phê đen, bút đỏ | khoanh tay hờn dỗi, lườm điện thoại, cười gượng đỏ mặt, ngủ vẫn cầm bút đỏ |
| **Sherlock** | Nova | `sherlock/review/log_a` · `talk` | thám tử: cốc giấy cà phê, kính lúp, sổ log | soi kính lúp vào cốc, chống cằm suy luận, cười "AHA", ngủ mũ deerstalker che mặt |

### 24d. IDLE — LYRA (nữ, mẫu = sheet idle PIXEL)

Đính kèm 3 ảnh theo đúng thứ tự:
1. `public/assets/pixel/idle_sheet.png`
2. `public/assets/lyra/coding/straight_type_a.png`
3. `public/assets/lyra/coding/talk_left.png`

```text
Draw a 12-pose IDLE sprite sheet of LYRA, a builder (girl coder) of my
isometric pixel-art office game, relaxing on her break in the CAFE and the
LOUNGE. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the APPROVED idle sheet of another character (Pixel). It is the
  TEMPLATE: copy its layout (6 columns x 2 rows), the pose order, the
  facing direction of every pose, the wooden cafe chairs (same chair, same
  angle, same chair-to-body size), the sprite scale and the warm lighting
  EXACTLY. Only the character, her gestures, expressions and props change.
  Do NOT copy anything of Pixel's look (no ice-blue wolf cut, no glasses,
  no yellow cardigan, no jeans).
  In chair_front_* the chair seat faces the LOWER-LEFT toward the viewer;
  in chair_back_* the chair is seen from behind, seat facing the
  UPPER-RIGHT toward the table, backrest toward the viewer.
- IMAGES 2-3: LYRA, approved. Image 2 from behind, image 3 turning her
  head so her face shows. Keep her EXACTLY: deep royal-blue hair with
  lighter blue highlights tied in a HIGH PONYTAIL falling past her
  shoulders, long side-swept fringe on the left, small white star hair clip
  at the ponytail tie; big bright-blue eyes, gentle smile, slightly rosy
  cheeks; light sky-blue over-ear headset with white star decals and a thin
  microphone; royal-blue cropped tech jacket with light-blue trim and a
  white star emblem on the upper back, white T-shirt hem at the waist, dark
  navy pleated skirt over black leggings, white-and-blue sneakers. Same
  chibi proportions (big head), same thick dark outline, same colours.
  She is calm, gentle and hard-working - even on a break she stays tidy.

HER ACCESSORIES ON BREAK (instead of Pixel's): an iced milk tea with a
straw (sit_drink), a small blue notebook with a star sticker and a pen, a
light-blue ceramic cup with a white star (chair_*_drink), her phone playing
a cute puzzle game (sit_phone), a takeaway coffee cup (stand_drink).
Headset resting around her neck in the relaxed poses, ON her head playing a
podcast in sit_doze.

THE 12 POSES (same order and angles as IMAGE 1, calm and neat body language):
row 1 — lounge, NO furniture drawn:
  sit_relax  - FRONT view facing the LOWER-RIGHT, sitting neatly with knees
               together, the small notebook open on her lap, writing a note
               with a soft smile
  sit_drink  - same facing, sipping the iced milk tea through the straw
               with both hands, eyes closed, happy
  sit_phone  - same facing, knees together, playing the puzzle game on her
               phone with both thumbs, focused little smile
  sit_laugh  - same facing, laughing gently with eyes closed, fingers
               covering her mouth
  sit_doze   - same facing, dozing off with her head tilted onto her
               shoulder, the notebook slipping from her hands, ponytail
               falling forward (peaceful; the game adds "Zzz")
  sit_back   - BACK view facing the UPPER-LEFT, ponytail and star clip
               toward the viewer, hugging her knees lightly
row 2 — cafe chair (chair INCLUDED, copy IMAGE 1) and standing:
  chair_front_drink - FRONT chair, facing the LOWER-LEFT, sipping from the
               star cup held in both hands
  chair_front_talk  - same chair and angle, chatting, one hand raised in a
               small wave, warm smile
  chair_back_drink  - BACK chair, facing the UPPER-RIGHT toward the table,
               back to the viewer, cup raised to her mouth, ponytail down
               her back
  chair_back_talk   - same chair and angle, head turned to the left in
               profile, chatting, ponytail swinging
  stand_brew - STANDING, back to the viewer, facing the UPPER-LEFT, both
               hands working an (undrawn) espresso machine, on tiptoe
  stand_drink- STANDING, FRONT view facing the LOWER-RIGHT, drinking the
               takeaway cup, notebook hugged under the other arm

OUTPUT: ONE image, landscape 1536x1024, the 12 sprites on a 6x2 grid.
- every sprite at the same scale (Lyra's head the same size in all 12, and
  the same head size as Pixel's in IMAGE 1); her ponytail must stay fully
  inside the sprite cell
- the exact pose name as a small label under each sprite, with AT LEAST
  40 px of empty background between the lowest point of the sprite (feet or
  chair legs) and the label; leave a clear empty band between the 2 rows
- background: genuinely transparent. If you cannot, use a FLAT SOLID
  MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO table, sofa, counter, machine, floor, cast shadow or glow halo (the
  cafe chairs in chair_* poses are the only furniture)
- gaps between legs, chair legs, arms and body = background too
- crisp pixel-art clusters, dark outlines, warm amber cafe lighting;
  no blur, no 3D render; no text except the labels
```

Nhận sheet về: lưu **`public/assets/lyra/idle_sheet.png`** → cắt → manifest cùng cỡ → thêm `lyra` vào `IDLERS`.

### 24e. IDLE — VEGA (nam, mẫu = sheet idle NOVA)

Đính kèm 3 ảnh theo đúng thứ tự:
1. `public/assets/nova/idle_sheet.png`
2. `public/assets/vega/coding/straight_type_a.png`
3. `public/assets/vega/coding/talk_left.png`

```text
Draw a 12-pose IDLE sprite sheet of VEGA, a builder (male coder) of my
isometric pixel-art office game, relaxing on his break in the CAFE and the
LOUNGE. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the APPROVED idle sheet of another builder (Nova). It is the
  TEMPLATE: copy its layout (6 columns x 2 rows), the pose order, the
  facing direction of every pose, the wooden cafe chairs (same chair, same
  angle, same chair-to-body size), the sprite scale and the warm lighting
  EXACTLY. Only the character, his gestures, expressions and props change.
  Do NOT copy anything of Nova's look (no spiky cobalt hair, no navy-cyan
  jacket, no energy drink).
  In chair_front_* the chair seat faces the LOWER-LEFT toward the viewer;
  in chair_back_* the chair is seen from behind, seat facing the
  UPPER-RIGHT toward the table, backrest toward the viewer.
- IMAGES 2-3: VEGA, approved. Image 2 from behind, image 3 turning his
  head so his face shows. Keep him EXACTLY: fluffy layered pale ICE-BLUE
  hair with white highlights; bright cyan-blue eyes, energetic open grin;
  white over-ear headset with glowing cyan rings and a thin microphone;
  SILVER-BLUE hooded tech jacket with cyan trim lines and a small white
  lightning-bolt emblem on the upper back, collar slightly raised; dark
  grey trousers; dark charcoal sneakers with cyan laces and white soles.
  Same chibi proportions (big head), same thick dark outline, same colours.
  He is young, quick and cheerful - he can never sit completely still.

HIS ACCESSORIES ON BREAK (instead of Nova's): a cyan sports water bottle
with a squeeze top (sit_drink), a white mug with a cyan lightning bolt
(chair_*_drink), his phone playing a racing game held sideways (sit_phone),
a tall iced coffee with a straw (stand_drink). Headset resting around his
neck in the relaxed poses, ON his head in sit_doze.

THE 12 POSES (same order and angles as IMAGE 1, bouncy energetic body
language):
row 1 — lounge, NO furniture drawn:
  sit_relax  - FRONT view facing the LOWER-RIGHT, leaning back stretching
               both arms high above his head, big happy yawn-grin, one
               foot bouncing
  sit_drink  - same facing, gulping from the squeeze bottle, other hand
               giving a thumbs-up
  sit_phone  - same facing, leaning forward, phone held sideways like a
               steering wheel in a racing game, body tilting into the
               turn, excited eyes
  sit_laugh  - same facing, laughing loudly with eyes closed, pumping a
               fist
  sit_doze   - same facing, fell asleep suddenly: head thrown back, mouth
               open, arms dangling loose (the game adds "Zzz")
  sit_back   - BACK view facing the UPPER-LEFT, back of his fluffy head to
               the viewer, one arm on the (undrawn) armrest, the other
               arm stretched up
row 2 — cafe chair (chair INCLUDED, copy IMAGE 1) and standing:
  chair_front_drink - FRONT chair, facing the LOWER-LEFT, taking a quick
               sip from the lightning mug, one knee bouncing
  chair_front_talk  - same chair and angle, chatting animatedly, both hands
               gesturing
  chair_back_drink  - BACK chair, facing the UPPER-RIGHT toward the table,
               back to the viewer, mug raised to his mouth
  chair_back_talk   - same chair and angle, head turned to the left in
               profile, grinning, chatting
  stand_brew - STANDING, back to the viewer, facing the UPPER-LEFT, quickly
               tapping the buttons of an (undrawn) espresso machine,
               bouncing on his toes
  stand_drink- STANDING, FRONT view facing the LOWER-RIGHT, sipping the iced
               coffee through the straw, other hand making a peace sign

OUTPUT: ONE image, landscape 1536x1024, the 12 sprites on a 6x2 grid.
- every sprite at the same scale (Vega's head the same size in all 12, and
  the same head size as Nova's in IMAGE 1); his fluffy hair and raised arms
  must stay fully inside the sprite cell
- the exact pose name as a small label under each sprite, with AT LEAST
  40 px of empty background between the lowest point of the sprite (feet or
  chair legs) and the label; leave a clear empty band between the 2 rows
- background: genuinely transparent. If you cannot, use a FLAT SOLID
  MAGENTA #FF00FF background. NEVER draw a checkerboard
- NO table, sofa, counter, machine, floor, cast shadow or glow halo (the
  cafe chairs in chair_* poses are the only furniture)
- gaps between legs, chair legs, arms and body = background too
- crisp pixel-art clusters, dark outlines, warm amber cafe lighting;
  no blur, no 3D render; no text except the labels
```

Nhận sheet về: lưu **`public/assets/vega/idle_sheet.png`** → cắt → manifest cùng cỡ → thêm `vega` vào `IDLERS`.

### 24f. IDLE — ATLAS (nam, mẫu = sheet idle NOVA)

Đính kèm 3 ảnh theo đúng thứ tự:
1. `public/assets/nova/idle_sheet.png`
2. `public/assets/atlas/coding/straight_type_a.png`
3. `public/assets/atlas/coding/talk_left.png`

```text
Draw a 12-pose IDLE sprite sheet of ATLAS, a builder (male coder) of my
isometric pixel-art office game, relaxing on his break in the CAFE and the
LOUNGE. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the APPROVED idle sheet of another builder (Nova). It is the
  TEMPLATE: copy its layout (6 columns x 2 rows), the pose order, the
  facing direction of every pose, the wooden cafe chairs (same chair, same
  angle, same chair-to-body size), the sprite scale and the warm lighting
  EXACTLY. Only the character, his gestures, expressions and props change.
  Do NOT copy anything of Nova's look (no spiky cobalt hair, no navy-cyan
  jacket, no energy drink, no game console).
  In chair_front_* the chair seat faces the LOWER-LEFT toward the viewer;
  in chair_back_* the chair is seen from behind, seat facing the
  UPPER-RIGHT toward the table, backrest toward the viewer.
- IMAGES 2-3: ATLAS, approved. Image 2 from behind, image 3 turning his
  head so his face shows. Keep him EXACTLY: messy, fluffy TEAL /
  turquoise hair with lighter mint highlights; bright aqua-blue eyes,
  warm open smile; compact black headset with small glowing teal rings and
  a thin microphone; BLACK hooded tech jacket with teal panels on the
  sleeves and shoulders, a bright WHITE hood lining forming a collar, and a
  teal triangle "A" emblem on the upper back; dark charcoal trousers;
  black-and-teal sneakers with white soles. Same chibi proportions (big
  head), same thick dark outline, same colours.
  He is friendly, practical and down-to-earth - the guy who always brings
  snacks and shares them.

HIS ACCESSORIES ON BREAK (instead of Nova's): a teal bento lunch box and a
sandwich (sit_relax), a big teal thermos cup of hot tea with steam
(sit_drink), a chunky teal mug (chair_*_drink), his phone playing a cozy
farming game (sit_phone), a paper bag of cookies (chair_front_talk), a
takeaway coffee cup (stand_drink). Headset resting around his neck in the
relaxed poses, ON his head in sit_doze.

THE 12 POSES (same order and angles as IMAGE 1, easy-going, generous body
language):
row 1 — lounge, NO furniture drawn:
  sit_relax  - FRONT view facing the LOWER-RIGHT, sitting comfortably with
               knees apart, the open bento box on his lap, taking a big
               happy bite of the sandwich
  sit_drink  - same facing, holding the big thermos cup with both hands,
               blowing on the hot tea, steam rising, cosy smile
  sit_phone  - same facing, leaning back, tending his farm in the cozy game
               on his phone, relaxed satisfied smile
  sit_laugh  - same facing, laughing heartily, eyes closed, slapping his
               knee with one hand
  sit_doze   - same facing, arms crossed over his chest, chin dropped to
               his chest, snoring peacefully, mouth slightly open (the game
               adds "Zzz")
  sit_back   - BACK view facing the UPPER-LEFT, back of his messy teal head
               and the white hood lining toward the viewer, one arm on the
               (undrawn) armrest
row 2 — cafe chair (chair INCLUDED, copy IMAGE 1) and standing:
  chair_front_drink - FRONT chair, facing the LOWER-LEFT, sipping from the
               chunky teal mug, other hand resting on his knee
  chair_front_talk  - same chair and angle, holding out the open bag of
               cookies to share with a friend, big friendly smile
  chair_back_drink  - BACK chair, facing the UPPER-RIGHT toward the table,
               back to the viewer, mug raised to his mouth
  chair_back_talk   - same chair and angle, head turned to the left in
               profile, chatting with a grin
  stand_brew - STANDING, back to the viewer, facing the UPPER-LEFT, both
               hands working an (undrawn) espresso machine
  stand_drink- STANDING, FRONT view facing the LOWER-RIGHT, drinking the
               takeaway cup, other hand raised in a friendly wave

OUTPUT: ONE image, landscape 1536x1024, the 12 sprites on a 6x2 grid.
- every sprite at the same scale (Atlas's head the same size in all 12,
  and the same head size as Nova's in IMAGE 1); his messy hair must stay
  fully inside the sprite cell
- the exact pose name as a small label under each sprite, with AT LEAST
  40 px of empty background between the lowest point of the sprite (feet or
  chair legs) and the label; leave a clear empty band between the 2 rows
- background: genuinely transparent. If you cannot, use a FLAT SOLID
  MAGENTA #FF00FF background. NEVER draw a checkerboard
- do NOT draw "Zzz", sweat drops or other effect symbols (the game adds
  its own effects)
- NO table, sofa, counter, machine, floor, cast shadow or glow halo (the
  cafe chairs in chair_* poses are the only furniture)
- gaps between legs, chair legs, arms and body = background too
- crisp pixel-art clusters, dark outlines, warm amber cafe lighting;
  no blur, no 3D render; no text except the labels
```

Nhận sheet về: lưu **`public/assets/atlas/idle_sheet.png`** → cắt → manifest theo cỡ ghế → thêm `atlas` vào `IDLERS`.

### 24g. IDLE — COMET (nam, mẫu = sheet idle NOVA)

Đính kèm 3 ảnh theo đúng thứ tự:
1. `public/assets/nova/idle_sheet.png`
2. `public/assets/comet/coding/straight_type_a.png`
3. `public/assets/comet/coding/talk_left.png`

```text
Draw a 12-pose IDLE sprite sheet of COMET, a builder (male coder) of my
isometric pixel-art office game, relaxing on his break in the CAFE and the
LOUNGE. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the APPROVED idle sheet of another builder (Nova). It is the
  TEMPLATE: copy its layout (6 columns x 2 rows), the pose order, the
  facing direction of every pose, the wooden cafe chairs (same chair, same
  angle, same chair-to-body size), the sprite scale and the warm lighting
  EXACTLY. Only the character, his gestures, expressions and props change.
  Do NOT copy anything of Nova's look (no spiky cobalt hair, no navy-cyan
  jacket, no big headset, no energy drink, no game console).
  In chair_front_* the chair seat faces the LOWER-LEFT toward the viewer;
  in chair_back_* the chair is seen from behind, seat facing the
  UPPER-RIGHT toward the table, backrest toward the viewer.
- IMAGES 2-3: COMET, approved. Image 2 from behind, image 3 turning his
  head so his face shows. Keep him EXACTLY: a slouchy DARK-PURPLE KNIT
  BEANIE with a small yellow comet/star pin; fluffy SILVER-LAVENDER hair
  spilling out under the beanie; round orange-gold glasses; small white
  wireless earbuds (NO big headset); an OVERSIZED CREAM-and-PURPLE VARSITY
  JACKET (cream body, purple sleeves, peach-orange striped cuffs and collar
  rib) with a big embroidered comet / shooting-star patch across the upper
  back; loose charcoal cargo trousers rolled up at the ankle; mismatched
  socks (one peach, one lavender); chunky cream skate sneakers. Same chibi
  proportions (big head), same thick dark outline, same colours.
  He is playful, mischievous and creative - an artist who doodles on
  everything and pulls funny faces.

HIS ACCESSORIES ON BREAK (instead of Nova's): a can of grape soda with a
twisty rainbow straw (sit_drink), a small sketchbook and a fat marker
(sit_relax, sit_doze, chair_front_talk), a purple mug shaped like a little
planet with a ring (chair_*_drink), his phone held sideways playing a
rhythm game (sit_phone), a takeaway cup with a doodled smiley face on it
(stand_drink). His beanie stays on in every pose.

THE 12 POSES (same order and angles as IMAGE 1, loose, cheeky, artsy body
language):
row 1 — lounge, NO furniture drawn:
  sit_relax  - FRONT view facing the LOWER-RIGHT, sitting cross-legged,
               doodling in the sketchbook on his knee with the marker,
               tongue poking out in concentration
  sit_drink  - same facing, slurping grape soda through the twisty straw,
               cheeks puffed, eyes crossed playfully
  sit_phone  - same facing, phone held sideways in a rhythm game, head
               bobbing to the beat, one foot tapping
  sit_laugh  - same facing, laughing while pulling a silly face (tongue
               out, one eye closed), pointing at a friend
  sit_doze   - same facing, sprawled messily, beanie slid down over his
               eyes, sketchbook open face-down on his chest, mouth open
  sit_back   - BACK view facing the UPPER-LEFT, the beanie and the big comet
               patch on the varsity jacket toward the viewer, one arm on the
               (undrawn) armrest
row 2 — cafe chair (chair INCLUDED, copy IMAGE 1) and standing:
  chair_front_drink - FRONT chair, facing the LOWER-LEFT, slouched, sipping
               from the planet mug, one sneaker propped up on his knee
  chair_front_talk  - same chair and angle, proudly showing an open page of
               his sketchbook to a friend, cheeky grin
  chair_back_drink  - BACK chair, facing the UPPER-RIGHT toward the table,
               back to the viewer, planet mug raised to his mouth
  chair_back_talk   - same chair and angle, head turned to the left in
               profile, chatting with a mischievous grin
  stand_brew - STANDING, back to the viewer, facing the UPPER-LEFT, carefully
               pouring milk to draw latte art at an (undrawn) espresso
               machine, leaning in
  stand_drink- STANDING, FRONT view facing the LOWER-RIGHT, drinking the
               doodled takeaway cup, other hand making finger guns

OUTPUT: ONE image, landscape 1536x1024, the 12 sprites on a 6x2 grid.
- every sprite at the same scale (Comet's head the same size in all 12, and
  the same head size as Nova's in IMAGE 1); his beanie and fluffy hair must
  stay fully inside the sprite cell
- the exact pose name as a small label under each sprite, with AT LEAST
  40 px of empty background between the lowest point of the sprite (feet or
  chair legs) and the label; leave a clear empty band between the 2 rows
- background: genuinely transparent. If you cannot, use a FLAT SOLID
  MAGENTA #FF00FF background. NEVER draw a checkerboard
- do NOT draw "Zzz", music notes, sweat drops or other effect symbols (the
  game adds its own effects)
- NO table, sofa, counter, machine, floor, cast shadow or glow halo (the
  cafe chairs in chair_* poses are the only furniture)
- gaps between legs, chair legs, arms and body = background too
- crisp pixel-art clusters, dark outlines, warm amber cafe lighting;
  no blur, no 3D render; no text except the labels
```

Nhận sheet về: lưu **`public/assets/comet/idle_sheet.png`** → cắt → manifest theo cỡ ghế → thêm `comet` vào `IDLERS`.

### 24h. IDLE — SAGE (reviewer nữ, mẫu = sheet idle PIXEL)

Ảnh tham chiếu của reviewer có **ghế review tím** → prompt dặn rõ không vẽ ghế đó. Đính kèm 3 ảnh theo đúng thứ tự:
1. `public/assets/pixel/idle_sheet.png`
2. `public/assets/sage/review/type_a.png`
3. `public/assets/sage/review/talk_left.png`

```text
Draw a 12-pose IDLE sprite sheet of SAGE, a code reviewer (girl) of my
isometric pixel-art office game, relaxing on her break in the CAFE and the
LOUNGE. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the APPROVED idle sheet of another character (Pixel). It is the
  TEMPLATE: copy its layout (6 columns x 2 rows), the pose order, the
  facing direction of every pose, the wooden cafe chairs (same chair, same
  angle, same chair-to-body size), the sprite scale and the warm lighting
  EXACTLY. Only the character, her gestures, expressions and props change.
  Do NOT copy anything of Pixel's look (no ice-blue wolf cut, no glasses,
  no yellow cardigan, no jeans).
  In chair_front_* the chair seat faces the LOWER-LEFT toward the viewer;
  in chair_back_* the chair is seen from behind, seat facing the
  UPPER-RIGHT toward the table, backrest toward the viewer.
- IMAGES 2-3: SAGE, approved, sitting at her work desk. Image 2 from
  behind, image 3 turning her head so her face shows. Use them ONLY for her
  look - do NOT draw the purple office chair from these images. Keep her
  EXACTLY: long straight DARK-PURPLE hair reaching her waist, straight-cut
  bangs, a small navy velvet bow in her hair; violet eyes, composed calm
  expression; cream turtleneck under a short PLUM cardigan with gold
  buttons; navy-and-plum plaid pleated midi skirt; sheer black tights;
  black loafers with gold buckles. Same chibi proportions (big head), same
  thick dark outline, same colours.
  She is serious, sharp and elegant - even on a break she sits upright and
  keeps her composure; she smiles only a little.

HER ACCESSORIES ON BREAK (instead of Pixel's): a white porcelain teacup on
a saucer (sit_drink, chair_*_drink), a thick hardcover book with a plum
ribbon bookmark (sit_relax, sit_doze, stand_drink), her phone showing a
logic puzzle (sit_phone), a small white teapot (stand_brew), a takeaway tea
cup (stand_drink).

THE 12 POSES (same order and angles as IMAGE 1, upright, elegant, minimal
body language):
row 1 — lounge, NO furniture drawn:
  sit_relax  - FRONT view facing the LOWER-RIGHT, sitting upright with
               knees together, reading the open hardcover book on her lap,
               focused, faint smile
  sit_drink  - same facing, sipping tea from the porcelain cup, saucer held
               below it in the other hand, eyes closed, serene
  sit_phone  - same facing, solving the logic puzzle on her phone, one
               finger on her chin, sharp eyes
  sit_laugh  - same facing, a small restrained laugh, eyes closed, the back
               of her fingers covering her mouth
  sit_doze   - same facing, dozing off while STILL sitting upright, head
               bowed slightly forward, the book open on her lap (peaceful;
               the game adds "Zzz")
  sit_back   - BACK view facing the UPPER-LEFT, her long straight hair and
               the navy bow toward the viewer, sitting upright, hands on lap
row 2 — cafe chair (chair INCLUDED, copy IMAGE 1) and standing:
  chair_front_drink - FRONT chair, facing the LOWER-LEFT, sitting upright,
               sipping from the teacup with the saucer in her other hand
  chair_front_talk  - same chair and angle, explaining something calmly,
               one finger raised, slight confident smile
  chair_back_drink  - BACK chair, facing the UPPER-RIGHT toward the table,
               back to the viewer, teacup raised to her mouth, long hair
               down her back
  chair_back_talk   - same chair and angle, head turned to the left in
               profile, chatting calmly
  stand_brew - STANDING, back to the viewer, facing the UPPER-LEFT, pouring
               hot water from the small teapot at an (undrawn) counter
  stand_drink- STANDING, FRONT view facing the LOWER-RIGHT, holding the
               takeaway tea cup, the hardcover book tucked under her arm,
               standing straight

OUTPUT: ONE image, landscape 1536x1024, the 12 sprites on a 6x2 grid.
- every sprite at the same scale (Sage's head the same size in all 12, and
  the same head size as Pixel's in IMAGE 1); her long hair must stay fully
  inside the sprite cell
- the exact pose name as a small label under each sprite, with AT LEAST
  40 px of empty background between the lowest point of the sprite (feet or
  chair legs) and the label; leave a clear empty band between the 2 rows
- background: genuinely transparent. If you cannot, use a FLAT SOLID
  MAGENTA #FF00FF background. NEVER draw a checkerboard, NEVER a grey or
  black background
- do NOT draw "Zzz", steam, music notes, sweat drops or other effect symbols
  (the game adds its own effects)
- NO table, sofa, counter, machine, office chair, floor, cast shadow or
  glow halo (the wooden cafe chairs in chair_* poses are the only furniture)
- gaps between legs, chair legs, arms and body = background too
- crisp pixel-art clusters, dark outlines, warm amber cafe lighting;
  no blur, no 3D render; no text except the labels
```

Nhận sheet về: lưu **`public/assets/sage/idle_sheet.png`** → cắt → manifest theo cỡ ghế → thêm `sage` vào `IDLERS` + nối ghế review (`ReviewSeat`) với `goIdle` để bấm Sage ở bàn review cũng đi nghỉ được.

⚠ Không gửi cho GPT ảnh có nhân vật khác lẫn vào (từng lẫn tóc Oracle vào Sherlock, tay áo Pixel vào Oracle) — ảnh 2–3 chỉ có 1 nhân vật.

### 24i. IDLE — IRIS (reviewer nữ, mẫu = sheet idle PIXEL)

Cùng khung 24h. Iris vui vẻ, biểu cảm (ngược với Sage điềm đạm): động tác to, tươi, chữ V, cười ôm bụng. Đính kèm 3 ảnh theo đúng thứ tự:
1. `public/assets/pixel/idle_sheet.png`
2. `public/assets/iris/review/type_a.png`
3. `public/assets/iris/review/talk_left.png`

```text
Draw a 12-pose IDLE sprite sheet of IRIS, a code reviewer (girl) of my
isometric pixel-art office game, relaxing on her break in the CAFE and the
LOUNGE. Do everything in one go without asking me anything.

ATTACHED:
- IMAGE 1: the APPROVED idle sheet of another character (Pixel). It is the
  TEMPLATE: copy its layout (6 columns x 2 rows), the pose order, the
  facing direction of every pose, the wooden cafe chairs (same chair, same
  angle, same chair-to-body size), the sprite scale and the warm lighting
  EXACTLY. Only the character, her gestures, expressions and props change.
  Do NOT copy anything of Pixel's look (no ice-blue wolf cut, no glasses,
  no yellow cardigan, no jeans).
  In chair_front_* the chair seat faces the LOWER-LEFT toward the viewer;
  in chair_back_* the chair is seen from behind, seat facing the
  UPPER-RIGHT toward the table, backrest toward the viewer.
- IMAGES 2-3: IRIS, approved, sitting at her work desk. Image 2 from
  behind, image 3 turning her head so her face shows. Use them ONLY for her
  look - do NOT draw the purple office chair from these images. Keep her
  EXACTLY: CORAL-PINK hair in a big fluffy HIGH PONYTAIL tied with a large
  white ribbon scrunchie, short wispy side strands, two small heart hair
  clips; bright pink eyes, rosy cheeks; cropped PINK varsity cardigan with
  white ribbed cuffs and hem and a small white star patch on the back, over
  a white frilly-collar top; NAVY pleated mini skirt with a thin white
  stripe near the hem; white ankle socks with tiny pink bows; white
  platform sneakers with pink laces; a pink heart charm phone strap. Same
  chibi proportions (big head), same thick dark outline, same colours.
  She is cheerful, bubbly and expressive - the team's mood-maker. Big happy
  gestures, sparkly eyes, her ponytail always lively.

HER ACCESSORIES ON BREAK (instead of Pixel's): a pink boba milk tea cup
with a big straw and visible tapioca pearls (sit_drink, chair_*_drink,
stand_drink), her phone in a pink case with the heart charm strap
(sit_phone, chair_front_talk), a small heart-shaped pink cushion (sit_doze),
a boba shaker cup and a tea scoop (stand_brew).

THE 12 POSES (same order and angles as IMAGE 1, lively and cute):
row 1 — lounge, NO furniture drawn:
  sit_relax  - FRONT view facing the LOWER-RIGHT, sitting with knees
               together and feet kicked up playfully, one hand making a
               V-sign next to her cheek, big smile, winking
  sit_drink  - same facing, holding the boba cup with BOTH hands, sipping
               from the straw, cheeks puffed, eyes happily closed
  sit_phone  - same facing, holding her phone up at arm's length taking a
               selfie, the other hand doing a V-sign, sparkly eyes
  sit_laugh  - same facing, laughing hard, eyes closed in happy arcs, both
               arms hugging her tummy, leaning slightly forward
  sit_doze   - same facing, dozing off hugging the heart cushion to her
               chest, head tilted onto it, ponytail drooping, peaceful smile
               (the game adds "Zzz")
  sit_back   - BACK view facing the UPPER-LEFT, her pink ponytail, white
               scrunchie and the star patch toward the viewer, sitting,
               hands on lap, ponytail swaying to one side
row 2 — cafe chair (chair INCLUDED, copy IMAGE 1) and standing:
  chair_front_drink - FRONT chair, facing the LOWER-LEFT, sitting with
               knees together, sipping the boba through the straw, one
               foot kicked up behind her
  chair_front_talk  - same chair and angle, excitedly showing her phone
               screen toward the viewer, other hand waving, big open smile
  chair_back_drink  - BACK chair, facing the UPPER-RIGHT toward the table,
               back to the viewer, boba cup raised to her mouth, ponytail
               and star patch toward the viewer
  chair_back_talk   - same chair and angle, head turned to the left in
               profile, chatting cheerfully, one hand raised in a little
               wave
  stand_brew - STANDING, back to the viewer, facing the UPPER-LEFT, shaking
               the boba shaker cup at an (undrawn) counter, ponytail
               bouncing
  stand_drink- STANDING, FRONT view facing the LOWER-RIGHT, holding the
               boba cup in one hand, the other hand doing a V-sign, one
               knee bent playfully, big smile

OUTPUT: ONE image, landscape 1536x1024, the 12 sprites on a 6x2 grid.
- every sprite at the same scale (Iris's head the same size in all 12, and
  the same head size as Pixel's in IMAGE 1); her ponytail must stay fully
  inside the sprite cell
- the exact pose name as a small label under each sprite, with AT LEAST
  40 px of empty background between the lowest point of the sprite (feet or
  chair legs) and the label; leave a clear empty band between the 2 rows
- background: genuinely transparent. If you cannot, use a FLAT SOLID
  MAGENTA #FF00FF background. NEVER draw a checkerboard, NEVER a grey or
  black background
- do NOT draw "Zzz", hearts, sparkles, steam, music notes, sweat drops or
  other effect symbols (the game adds its own effects)
- NO table, sofa, counter, machine, office chair, floor, cast shadow or
  glow halo (the wooden cafe chairs in chair_* poses are the only furniture)
- gaps between legs, chair legs, arms and body = background too
- crisp pixel-art clusters, dark outlines, warm amber cafe lighting;
  no blur, no 3D render; no text except the labels
```

Nhận sheet về: lưu **`public/assets/iris/idle_sheet.png`** → cắt → manifest theo cỡ ghế (ghế `chair_back_drink` ≈ 112 px như Pixel) → thêm `iris` vào `IDLERS`.

⚠ Iris thích biểu cảm → GPT dễ tự vẽ tim/lấp lánh quanh nhân vật; nếu có thì xoá blob riêng như "Zzz" của Vega.

---

## Negative chung (thêm vào cuối nếu kết quả hay lỗi)

`different character, different hair colour, different outfit, different chair, chair without person, extra chair, extra person, standing, legs straight, face fully visible, front view, mirrored lighting, desk, monitor, keyboard, floor, cast shadow, checkerboard, white background, text, label, frame, smooth 3D render, blurry pixels, watermark`

## Checklist duyệt từng ảnh

- [ ] Nhân vật + ghế giống master (tóc, headset, áo, ghế)
- [ ] Nền trong suốt thật (góc ảnh alpha = 0)
- [ ] Bánh xe giữa vẫn ở giữa-đáy ảnh, đế ghế không bị cắt
- [ ] Ánh sáng amber vẫn ở phía trên-trái
- [ ] Đúng tư thế, không duỗi chân thành đứng
