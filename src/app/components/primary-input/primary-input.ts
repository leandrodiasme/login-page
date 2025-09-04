// Arquivo: primary-input.component.ts

import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

// Define os tipos de input permitidos
type InputTypes = "text" | "email" | "password";

@Component({
  selector: 'app-primary-input',
  standalone: true, // Componentes com a propriedade 'imports' são standalone
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './primary-input.html',
  styleUrl: './primary-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // 'useExisting' em vez de 'userExisting', e 'forwardRef' aponta para a própria classe
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }
  ]
})
export class PrimaryInputComponent implements ControlValueAccessor {
  // --- Propriedades do Componente (Inputs) ---
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";

  // --- Propriedades internas para o ControlValueAccessor ---
  value: string = '';
  isDisabled: boolean = false;

  // Funções que serão substituídas pelo Angular Forms
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};


  // --- Métodos da Interface ControlValueAccessor ---

  /**
   * Escreve um novo valor no elemento.
   * Chamado pelo Angular Forms para atualizar o valor do componente.
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Registra uma função de callback que deve ser chamada quando o valor do controle muda.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registra uma função de callback que deve ser chamada quando o controle é "tocado".
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Chamado quando o estado "disabled" do controle muda.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // --- Método para lidar com a entrada do usuário no template HTML ---

  onInput(event: Event): void {
    // Pega o valor do input
    const inputValue = (event.target as HTMLInputElement).value;
    // Atualiza o valor interno
    this.value = inputValue;
    // Notifica o Angular Forms sobre a mudança
    this.onChange(this.value);
    // Notifica o Angular Forms que o controle foi "tocado"
    this.onTouched();
  }
}