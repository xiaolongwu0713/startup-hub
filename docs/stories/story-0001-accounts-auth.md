# Story: WeChat Login + Basic Profile Setup (MVP)

## 1. Goal
Enable users to authenticate via WeChat OAuth and complete minimal profile setup to support posting ideas and team collaboration. This story creates the foundational user authentication and profile system needed for the startup-hub platform.

## 2. Scope

### What's IN:
- WeChat OAuth login flow (`wx.login` → `code2Session`)
- Basic profile creation/editing (nickname, skills, city, bio)
- Profile viewing (self and others)
- Session management with `openid`
- Basic profile validation

### What's OUT:
- Phone number/SMS login (future story)
- Email authentication (not in architecture)
- Advanced privacy settings
- Notification preferences
- Device management
- Profile picture upload (keeping avatar from WeChat)

## 3. Dev Notes

### Proposed File Structure:
```
miniprogram/
├── pages/
│   ├── auth/
│   │   └── login.ts|wxml|wxss        # Login landing page
│   └── profile/
│       ├── edit.ts|wxml|wxss         # Profile edit form
│       └── view.ts|wxml|wxss         # Profile display
├── utils/
│   └── auth.ts                       # Auth helper functions
└── store/
    └── user.ts                       # User state management

cloudfunctions/
└── auth/
    ├── login/index.js                # wx.login → openid
    └── profile/index.js              # CRUD profile data
```

### Key Functions:
1. **`cloudfunctions/auth/login/index.js`**
   - `code2Session(code)` - Exchange wx.login code for openid
   - Create user record in `users` collection if new
   - Return user session data

2. **`cloudfunctions/auth/profile/index.js`**
   - `getProfile(openid)` - Fetch user profile
   - `updateProfile(openid, profileData)` - Update user profile
   - Validate required fields (nickname)

3. **`miniprogram/utils/auth.ts`**
   - `doLogin()` - Handle WeChat OAuth flow
   - `checkLoginStatus()` - Verify valid session
   - `logout()` - Clear local session

4. **`miniprogram/store/user.ts`**
   - User state management
   - Profile data caching
   - Login status tracking

### Database Schema (TCB):
- Collection: `users` (already defined in architecture)
- Key fields: `openid`, `nickname`, `avatar_url`, `city`, `bio`, `skills[]`
- Validation: `nickname` required, `skills` max 5 items

## 4. Acceptance Criteria

### AC1: WeChat Login Flow
- **Given** a new user opens the app
- **When** they tap "微信登录" 
- **Then** WeChat OAuth completes and they land on profile setup
- **And** their `openid` and basic WeChat info is stored in `users` collection

### AC2: Profile Creation
- **Given** a newly logged-in user with incomplete profile
- **When** they complete nickname (required) and optional fields (city, bio, skills)
- **And** tap "保存"
- **Then** profile is saved and they can access main app features
- **And** profile shows completion status

### AC3: Profile Editing
- **Given** an existing user with completed profile
- **When** they navigate to profile edit
- **Then** current values are pre-filled
- **And** they can modify and save changes
- **And** changes persist after app restart

### AC4: Profile Viewing
- **Given** any user
- **When** they view their own or another user's profile
- **Then** public profile information displays correctly
- **And** privacy settings are respected (if set)

### AC5: Session Persistence
- **Given** a logged-in user
- **When** they close and reopen the app
- **Then** they remain logged in without re-authentication
- **And** profile data loads from cache or server

## 5. Test Ideas

### Manual Testing:
1. **Login Flow**: Test WeChat OAuth on device, verify user creation
2. **Profile Setup**: Complete profile with various field combinations
3. **Profile Edit**: Modify existing profile, verify persistence
4. **Session**: Close/reopen app, verify login state
5. **Validation**: Test required field validation, character limits

### Basic Automated Testing:
1. **Unit Tests** (Jest for cloud functions):
   - `auth/login` function with mock wx.login code
   - `auth/profile` CRUD operations
   - Profile validation logic

2. **Integration Tests** (Mini Program Testing):
   - Login flow simulation
   - Profile form submission
   - Data persistence verification

### Test Data:
```javascript
// Sample test profile
{
  nickname: "创业者小王",
  city: "北京",
  bio: "专注AI产品设计，寻求技术合伙人",
  skills: ["产品", "设计", "AI"]
}
```

## 6. References

### PRD Sections:
- **Epic 1, Section 3.1**: 登录/注册 - "微信 OAuth 登录（可二选一起步）"
- **Epic 1, Section 3.2**: 用户资料 - "必填：昵称；可选：城市、简介、技能标签"
- **Epic 1, Section 5**: 验收标准 - "90% 新用户 ≤ 30 秒完成登录"

### Architecture References:
- **Section 2.1**: `users` collection schema
- **Section 3**: 云函数调用模式 (`wx.cloud.callFunction`)
- **Section 1**: 微信小程序前端 + TCB 云开发架构

---

**估时**: 2-3小时开发 + 1小时测试
**优先级**: P0 (阻塞其他功能)
**依赖**: 云开发环境配置完成
