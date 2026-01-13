-- Remover política atual que causa dependência circular
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Criar nova política: usuários podem ver sua própria role
CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política adicional: admins podem ver todas as roles (para gestão futura)
CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));