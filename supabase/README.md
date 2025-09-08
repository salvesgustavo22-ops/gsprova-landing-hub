# Supabase Configuration - GS Aprova

## 📁 Estrutura da Pasta Supabase

```
supabase/
├── migrations/         # Migrações SQL (auto-geradas)
├── lib/               # Helpers e utilitários JavaScript
├── config.toml        # Configuração do projeto Supabase
└── README.md         # Este arquivo
```

## 🔐 Segurança

### Chaves de API
- ✅ **ANON Key**: Segura para uso no frontend
- ❌ **SERVICE ROLE**: Nunca expor no código cliente

### Row Level Security (RLS)
Todas as tabelas possuem RLS habilitado com policies específicas:

#### Tabela: `essays`
- Users: podem ver/editar apenas suas próprias redações
- Corretors: podem ver/editar todas as redações

#### Tabela: `leads`
- Anonymous: podem inserir leads
- Admins: podem visualizar todos os leads

#### Tabela: `profiles`
- Users: podem ver/editar apenas seu próprio perfil
- Corretors: podem visualizar todos os perfis

#### Tabela: `user_roles`
- Users: podem ver apenas suas próprias roles
- Admins: podem gerenciar todas as roles

## 🗄️ Tabelas Principais

### Essays
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- origin (enum: gs_aprova | external)
- bank (enum: enem | fuvest | unicamp | outros)
- status (enum: enviada | em_correcao | corrigida | revisao)
- theme_title (text)
- essay_file_path (text)
- correction_file_path (text)
- correction_id (text, unique)
```

### Leads
```sql
- id (uuid, primary key)
- name (text)
- email (text)
- phone (text)
- lead_type (text)
- service_selected (text)
- source (text)
- message (text)
```

### Profiles
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- first_name (text)
- last_name (text)
- phone (text)
- data_protection_accepted (boolean)
```

### User Roles
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- role (enum: admin | corretor | user)
```

## 🛠️ Functions Disponíveis

### `has_role(user_id, role)`
Verifica se um usuário possui uma role específica.
```sql
SELECT has_role(auth.uid(), 'admin');
```

### `is_admin_user()`
Verifica se o usuário atual é admin.
```sql
SELECT is_admin_user();
```

### `is_corretor_user()`
Verifica se o usuário atual é corretor.
```sql
SELECT is_corretor_user();
```

### `generate_correction_id(origin)`
Gera ID único para correções.
```sql
SELECT generate_correction_id('gs_aprova');
```

## 📦 Storage Buckets

### `essay-files`
- **Público**: Não
- **Uso**: Armazenamento de redações e correções
- **Políticas**: Acesso restrito por usuário/corretor

## 🔧 Helpers JavaScript

Localizado em `/lib/helpers.js`:

### Validação
- `isValidEmail(email)`
- `isValidPhone(phone)`
- `validateRequiredFields(data, fields)`

### Segurança
- `sanitizeInput(input)`
- `checkRateLimit(key, maxRequests, windowMs)`
- `getClientIP(request)`

### Responses
- `createErrorResponse(message, status, details)`
- `createSuccessResponse(data, status)`

### Upload
- `validateFileUpload(file, allowedTypes, maxSize)`

## 🚀 Como Usar

### 1. Importar Cliente Supabase
```typescript
import { supabase } from '@/integrations/supabase/client';
```

### 2. Queries Seguras
```typescript
// ✅ Bom: Query com RLS
const { data } = await supabase
  .from('essays')
  .select('*')
  .eq('user_id', user.id);

// ❌ Ruim: Select * sem filtros
const { data } = await supabase
  .from('essays')
  .select('*');
```

### 3. Usar Functions
```typescript
const { data } = await supabase
  .rpc('has_role', { 
    _user_id: user.id, 
    _role: 'admin' 
  });
```

## 🔄 Migrações

### Aplicar Nova Migração
```bash
# Via Supabase CLI (se configurado)
supabase db push

# Via Dashboard Supabase
# Copiar SQL para SQL Editor
```

### Padrões de Migração
1. Sempre usar transações
2. Incluir rollback quando possível
3. Testar em ambiente de dev primeiro
4. Documentar mudanças

## ⚠️ Importante

### Nunca Fazer
- ❌ Expor `service_role` key no frontend
- ❌ Queries sem RLS em tabelas sensíveis
- ❌ Modificar schemas manualmente sem migração
- ❌ Hardcode de IDs de usuário

### Sempre Fazer
- ✅ Validar entrada do usuário
- ✅ Usar policies RLS apropriadas
- ✅ Logs de auditoria para ações importantes
- ✅ Rate limiting para endpoints públicos

## 🐛 Debugging

### Logs Supabase
```sql
-- Ver logs de autenticação
SELECT * FROM auth.audit_log_entries 
ORDER BY created_at DESC LIMIT 10;

-- Verificar policies
SELECT * FROM pg_policies 
WHERE tablename = 'essays';
```

### Testar RLS
```sql
-- Simular usuário específico
SET request.jwt.claims.sub = 'user-uuid-here';
SELECT * FROM essays;
```